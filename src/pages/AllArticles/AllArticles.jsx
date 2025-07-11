// AllArticles.jsx
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
  const [filters, setFilters] = useState({
    publisher: "",
    tags: "",
    search: "",
  });

  useEffect(() => {
    axiosSecure.get("/publishers").then((res) => setPublishers(res.data));
  }, [axiosSecure]);

  useEffect(() => {
    const { publisher, tags, search } = filters;
    const query = new URLSearchParams();
    if (publisher) query.append("publisher", publisher);
    if (tags) query.append("tags", tags);
    if (search) query.append("search", search);

    axiosSecure.get(`/articles?${query.toString()}`).then((res) => {
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setArticles(sorted);
    });
  }, [filters, axiosSecure]);

  const handleSearchChange = (e) =>
    setFilters({ ...filters, search: e.target.value });

  const handleDetailsClick = async (articleId) => {
    try {
      await axiosSecure.post(`/articles/increment-view/${articleId}`);
      navigate(`/article-details/${articleId}`);
    } catch (error) {
      console.error("View count error:", error);
    }
  };

  if (isStatusLoading)
    return <div className="text-center py-10">Loading...</div>;

  const displayedArticles = articles;

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
          onChange={(e) =>
            setFilters({ ...filters, publisher: e.target.value })
          }
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
          <option value="crime">Crime</option>
          <option value="politics">Politics</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
          <option value="health">Health</option>
          <option value="business">Business</option>
          <option value="education">Education</option>
          <option value="environment">Environment</option>
          <option value="travel">Travel</option>
          <option value="weather">Weather</option>
        </select>
      </div>

      {/* Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedArticles.map((article, index) => {
          const isPremium = article.articleType === "premium";
          const isDisabled = isPremium && userStatus !== "premium";

          return (
            <motion.div
              key={article._id}
              className={`card shadow-2xl transition duration-300 rounded-xl ${
                isPremium ? "border-2" : "bg-base-100"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 * 0.1 }}
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
                <h2 className="card-title">
                  {article.title}
                  {isPremium && (
                    <span className="badge badge-warning ml-2 bg-linear-to-r from-cyan-500 to-blue-500 text-white">
                      Premium
                    </span>
                  )}
                </h2>

                <p className="text-sm text-gray-500">
                  Publisher: {article.publisher}
                </p>

                <p className="line-clamp-3 text-gray-700 dark:text-gray-300">
                  {article.description}
                </p>

                <p className="text-xs mt-2 text-gray-400">
                  Published: {moment(article.createdAt).format("LL")}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    {article.views || 0} <FaEye />
                  </p>
                  <button
                    className={`btn btn-sm btn-outline cursor-pointer ${
                      isDisabled
                        ? "cursor-not-allowed"
                        : "btn-primary"
                    }`}
                    onClick={() =>
                      !isDisabled && handleDetailsClick(article._id)
                    }
                    disabled={isDisabled}
                    title={
                      isDisabled
                        ? "Only accessible by Premium users"
                        : "View Details"
                    }
                  >
                    {isDisabled ? "Premium Only" : "Details"}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AllArticles;
