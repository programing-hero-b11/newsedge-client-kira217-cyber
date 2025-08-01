import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useStatus from "../../hooks/useStatus";
import { FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import moment from "moment";

const PremiumArticles = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [userStatus, isStatusLoading] = useStatus();

  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 9;

  useEffect(() => {
    axiosSecure
      .get(`/articles/premium?page=${page}&limit=${limit}`)
      .then((res) => {
        setArticles(res.data.articles);
        setTotal(res.data.total);
      });
  }, [axiosSecure, page]);

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

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Premium Articles
      </h1>

      {/* 🔥 Premium Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const isDisabled = userStatus !== "premium";

          return (
            <motion.div
              key={article._id}
              className="card shadow-2xl transition duration-300 rounded-xl"
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
                  <span className="badge badge-warning ml-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                    Premium
                  </span>
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
                    className="btn btn-primary btn-outline cursor-pointer"
                    onClick={() =>
                      !isDisabled && handleDetailsClick(article._id)
                    }
                  >
                    Details
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
            className={`btn btn-sm ${
              pg === page ? "btn-active" : "btn-outline"
            }`}
            onClick={() => setPage(pg)}
          >
            {pg}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PremiumArticles;
