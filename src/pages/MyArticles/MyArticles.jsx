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
  const [declineReason, setDeclineReason] = useState("");

  const {
    data: articles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-articles", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-articles?email=${user?.email}`
      );
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

  const handleViewReason = (reason) => {
    setDeclineReason(reason || "No reason provided");
    document.getElementById("reasonModal").showModal();
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4 mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">My Articles</h2>

      {/* Table for Desktop */}
      <div className="hidden lg:block overflow-auto">
        <div className="flex justify-center overflow-x-auto">
          <table className="table w-full max-w-5xl">
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
                      <span className="badge badge-error">Declined</span>
                    ) : (
                      <span
                        className={`badge ${
                          article.status === "published"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {article.status}
                      </span>
                    )}
                  </td>
                  <td>{article.articleType === "premium" ? "Yes" : "No"}</td>
                  <td className="flex gap-2 flex-wrap">
                    <Link
                      to={`/article-details/${article._id}`}
                      className="btn btn-xs btn-info"
                    >
                      Details
                    </Link>

                    {/* Only show Update if not declined */}
                    {article.status !== "declined" && (
                      <Link
                        to={`/update-article/${article._id}`}
                        className="btn btn-xs btn-primary"
                      >
                        Update
                      </Link>
                    )}

                    {/* If declined, show View Reason */}
                    {article.status === "declined" && (
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => handleViewReason(article.reason)}
                      >
                        View Reason
                      </button>
                    )}

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
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-6">
        {articles.map((article, index) => (
          <div
            key={article._id}
            className="card bg-base-200 p-4 shadow-md space-y-3"
          >
            <h3 className="text-lg font-bold">
              {index + 1}. {article.title}
            </h3>
            <p className="font-bold">
              Status:
              <span
                className={`badge ml-2 ${
                  article.status === "published"
                    ? "badge-success"
                    : article.status === "declined"
                    ? "badge-error"
                    : "badge-warning"
                }`}
              >
                {article.status}
              </span>
            </p>
            <p className="font-bold">
              isPremium: {article.articleType === "premium" ? "Yes" : "No"}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                to={`/article-details/${article._id}`}
                className="btn btn-info btn-sm"
              >
                Details
              </Link>
              {article.status !== "declined" && (
                <Link
                  to={`/update-article/${article._id}`}
                  className="btn btn-primary btn-sm"
                >
                  Update
                </Link>
              )}
              {article.status === "declined" && (
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleViewReason(article.reason)}
                >
                  View Reason
                </button>
              )}
              <button
                onClick={() => setSelectedArticle(article._id)}
                className="btn btn-error btn-sm"
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
            <h3 className="font-bold text-lg">
              Are you sure you want to delete this article?
            </h3>
            <div className="modal-action">
              <button onClick={() => setSelectedArticle(null)} className="btn">
                Cancel
              </button>
              <button onClick={handleDelete} className="btn btn-error">
                Yes, Delete
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Decline Reason Modal */}
      <dialog id="reasonModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-error">Decline Reason</h3>
          <p className="py-4">{declineReason}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyArticles;
