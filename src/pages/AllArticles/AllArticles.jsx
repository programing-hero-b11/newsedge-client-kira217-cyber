import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useStatus from "../../hooks/useStatus";
import { FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import moment from "moment";

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [userStatus, isStatusLoading] = useStatus();

  const [articles, setArticles] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [filters, setFilters] = useState({ publisher: "", tags: "", search: "" });
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const limit = 9;

  useEffect(() => {
    axiosSecure.get("/publishers").then((res) => setPublishers(res.data));
  }, [axiosSecure]);

  useEffect(() => {
    const { publisher, tags, search } = filters;
    const query = new URLSearchParams();
    if (publisher) query.append("publisher", publisher);
    if (tags) query.append("tags", tags);
    if (search) query.append("search", search);
    query.append("page", page);
    query.append("limit", limit);

    axiosSecure.get(`/articles?${query.toString()}`).then((res) => {
      setArticles(res.data.articles);
      setTotalArticles(res.data.total);
    });
  }, [filters, page, axiosSecure]);

  const totalPages = Math.ceil(totalArticles / limit);

  const handleSearchChange = (e) =>
    setFilters({ ...filters, search: e.target.value, page: 1 });

  const handleDetailsClick = async (articleId) => {
    await axiosSecure.post(`/articles/increment-view/${articleId}`);
    navigate(`/article-details/${articleId}`);
  };

  if (isStatusLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        All Articles
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title"
          className="input input-bordered w-full md:w-1/3"
          onChange={handleSearchChange}
          value={filters.search}
        />
        <select
          className="select select-bordered w-full md:w-1/3"
          onChange={(e) => setFilters({ ...filters, publisher: e.target.value })}
          value={filters.publisher}
        >
          <option value="">All Publishers</option>
          {publishers.map((pub) => (
            <option key={pub._id} value={pub.name}>
              {pub.name}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered w-full md:w-1/3"
          onChange={(e) => setFilters({ ...filters, tags: e.target.value })}
          value={filters.tags}
        >
          <option value="">All Tags</option>
          {["crime", "politics", "sports", "technology", "health", "business", "education", "environment", "travel", "weather"].map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const isPremium = article.articleType === "premium";
          const isDisabled = isPremium && userStatus !== "premium";
          return (
            <motion.div
              key={article._id}
              className={`card shadow-2xl transition duration-300 rounded-xl ${
                isPremium ? "" : "bg-base-100"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
            >
              <figure>
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-48 w-full object-cover rounded-t-xl"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-wrap">
                  {article.title}
                  {isPremium && (
                    <span className="badge badge-warning ml-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      Premium
                    </span>
                  )}
                </h2>
                <p className="text-sm text-gray-500">Publisher: {article.publisher}</p>
                <p className="line-clamp-3">{article.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Published: {moment(article.createdAt).format("LL")}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm flex items-center gap-1">
                    {article.views || 0} <FaEye />
                  </p>
                  <button
                    className={`btn ${
                      isDisabled ? "btn-disabled" : "btn-primary btn-outline"
                    }`}
                    disabled={isDisabled}
                    onClick={() => !isDisabled && handleDetailsClick(article._id)}
                  >
                    {isDisabled ? "Premium Only" : "Details"}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 flex-wrap gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
          <button
            key={pg}
            className={`btn btn-sm ${pg === page ? "btn-active" : "btn-outline"}`}
            onClick={() => setPage(pg)}
          >
            {pg}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
