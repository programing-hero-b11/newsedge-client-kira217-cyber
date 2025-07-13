import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import { Link } from "react-router";

const TrendingArticles = () => {
  const axiosSecure = useAxiosSecure();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axiosSecure.get("/articles/trending").then((res) => {
      setArticles(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        🔥 Trending Articles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <motion.div
            key={article._id}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {article.description}
              </p>
              <p className="text-xs text-gray-400">
                Published: {moment(article.createdAt).format("LL")}
              </p>
              <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                {article.views || 0} <FaEye />
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link to="/all-articles">
          <button className=" btn btn-primary btn-outline px-5 py-2 rounded  transition">
            View All Articles
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TrendingArticles;
