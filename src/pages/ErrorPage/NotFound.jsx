import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import notFound from "../../assets/not-found.png"

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 px-4 text-center">
      {/* Animation container */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md"
      >
        <h1 className="text-7xl md:text-9xl font-extrabold text-blue-600 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-800">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-outline px-6 py-2 rounded-full flex items-center gap-2"
          >
            <FaArrowLeft />
            Go Home
          </motion.button>
        </Link>
      </motion.div>

      {/* Decorative animation below */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-10"
      >
        <img
          src={notFound}
          alt="404 illustration"
          className="w-full max-w-sm mx-auto"
        />
      </motion.div>
    </div>
  );
};

export default NotFound;
