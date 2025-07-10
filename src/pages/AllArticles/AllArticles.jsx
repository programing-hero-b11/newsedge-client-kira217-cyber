import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useStatus from "../../hooks/useStatus";

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

  // Load Publishers
  useEffect(() => {
    axiosSecure.get("/publishers").then((res) => setPublishers(res.data));
  }, [axiosSecure]);

  // Load Filtered Articles
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

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  if (isStatusLoading)
    return <div className="text-center py-10">Loading...</div>;

  // Filter articles based on userStatus:
  // - Premium users see all
  // - Normal users see all normal cards + premium cards (but with disabled buttons)
  const displayedArticles =
    userStatus === "premium"
      ? articles
      : articles
          .filter((article) => article.articleType !== "premium")
          .concat(
            articles.filter((article) => article.articleType === "premium")
          );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        All Articles
      </h1>

      {/* Filter Section */}
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

      {/* Articles Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedArticles.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No articles found.
          </p>
        )}

        {displayedArticles.map((article) => {
          const isPremium = article.articleType === "premium";

          // For normal users, disable premium article button
          // For premium users, enable all buttons
          const isButtonDisabled = isPremium && userStatus !== "premium";

          return (
            <div
              key={article._id}
              className={`card shadow-xl transition duration-300 hover:shadow-2xl ${
                isPremium
                  ? "border-2 border-yellow-400 bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-yellow-900 dark:to-yellow-700"
                  : "bg-base-100"
              }`}
            >
              <figure>
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-48 w-full object-cover rounded-t-lg"
                  loading="lazy"
                />
              </figure>
              <div className="card-body flex flex-col">
                <h2 className="card-title">
                  {article.title}
                  {isPremium && (
                    <span className="badge bg-yellow-500 text-white ml-2">
                      Premium
                    </span>
                  )}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Publisher: {article.publisher}
                </p>
                <p className="line-clamp-3 flex-grow text-gray-700 dark:text-gray-300">
                  {article.description}
                </p>

                <div className="card-actions justify-end pt-4">
                  <button
                    className={`btn btn-sm ${
                      isButtonDisabled
                        ? "btn-disabled cursor-not-allowed"
                        : "btn-primary"
                    }`}
                    onClick={() =>
                      !isButtonDisabled &&
                      navigate(`/article-details/${article._id}`)
                    }
                    aria-disabled={isButtonDisabled}
                    title={
                      isButtonDisabled
                        ? "Available for premium users only"
                        : "View article details"
                    }
                  >
                    {isButtonDisabled ? "Premium Only" : "Details"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllArticles;
