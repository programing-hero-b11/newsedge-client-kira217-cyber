// MyArticles.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyArticles = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedArticle, setSelectedArticle] = useState(null);

  const {
    data: articles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-articles", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-articles?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/articles/${selectedArticle}`);
      toast.success("Article deleted successfully");
      setSelectedArticle(null);
      refetch();
    } catch (err) {
      toast.error("Failed to delete article");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Articles</h2>

      {/* Table for tablet/laptop */}
      <div className="hidden md:block">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>isPremium</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article._id}>
                <td>{index + 1}</td>
                <td className="font-bold">{article.title}</td>
                <td>
                  {article.status === "declined" ? (
                    <div>
                      <span className="badge badge-error">Declined</span>
                      <button
                        className="btn btn-xs btn-link"
                        onClick={() => toast.info(article.reason || "No reason provided")}
                      >
                        View Reason
                      </button>
                    </div>
                  ) : (
                    <span className={`badge ${article.status === "approved" ? "badge-success" : "badge-warning"}`}>
                      {article.status}
                    </span>
                  )}
                </td>
                <td>{article.articleType === "premium" ? "Yes" : "No"}</td>
                <td className="flex gap-2">
                  <Link to={`/article-details/${article._id}`} className="btn btn-xs btn-info">
                    Details
                  </Link>
                  <Link to={`/update-article/${article._id}`} className="btn btn-xs btn-primary">
                    Update
                  </Link>
                  <button
                    onClick={() => setSelectedArticle(article._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for mobile */}
      <div className="md:hidden space-y-8">
        {articles.map((article, index) => (
          <div key={article._id} className="card bg-base-200 p-4 shadow-md space-y-4">
            <h3 className="text-lg font-bold">{index + 1}. {article.title}</h3>
            <p className="font-bold">Status: 
              <span className={`badge ${article.status === "approved" ? "badge-success" : article.status === "declined" ? "badge-error" : "badge-warning"}`}>
                {article.status}
              </span>
              {article.status === "declined" && (
                <button
                  className="btn btn-xs btn-link"
                  onClick={() => toast.info(article.reason || "No reason provided")}
                >
                  View Reason
                </button>
              )}
            </p>
            <p className="font-bold">isPremium: {article.articleType === "premium" ? "Yes" : "No"}</p>
            <div className="flex gap-2 mt-2">
              <Link to={`/article-details/${article._id}`} className="btn  btn-info">
                Details
              </Link>
              <Link to={`/update-article/${article._id}`} className="btn  btn-primary">
                Update
              </Link>
              <button
                onClick={() => setSelectedArticle(article._id)}
                className="btn  btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {selectedArticle && (
        <dialog id="deleteModal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure you want to delete this article?</h3>
            <div className="modal-action">
              <button onClick={() => setSelectedArticle(null)} className="btn">Cancel</button>
              <button onClick={handleDelete} className="btn btn-error">Yes, Delete</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyArticles;
