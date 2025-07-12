import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const ManageArticles = () => {
  const axiosSecure = useAxiosSecure();
  const [declineReason, setDeclineReason] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

  const {
    data: articles = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["manageArticles"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-articles");
      return data;
    },
  });

  useEffect(() => {
    const filtered = articles
      .filter((article) =>
        article.title.toLowerCase().includes(search.toLowerCase())
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    setFilteredArticles(filtered);
  }, [search, articles]);

  const handleApprove = async (id) => {
    const res = await axiosSecure.patch(`/articles/approve/${id}`);
    if (res.data.modifiedCount > 0) {
      toast.success("Article Approved!");
      refetch();
    }
  };

  const handleDecline = async () => {
    if (!declineReason) return toast.error("Reason is required!");
    const res = await axiosSecure.patch(`/articles/decline/${selectedId}`, {
      reason: declineReason,
    });
    if (res.data.modifiedCount > 0) {
      toast.success("Article Declined!");
      setSelectedId(null);
      setDeclineReason("");
      document.getElementById("decline_modal").close();
      refetch();
    }
  };

  const handleMakePremium = async (id) => {
    const res = await axiosSecure.patch(`/articles/premium/${id}`);
    if (res.data.modifiedCount > 0) {
      toast.success("Marked as Premium!");
      refetch();
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto overflow-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Articles</h2>

      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full md:max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table for Desktop/Tablet */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Email</th>
              <th>Photo</th>
              <th>Posted</th>
              <th>Publisher</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article) => (
              <tr key={article._id}>
                <td className="font-bold">{article.title}</td>
                <td>{article.author.name}</td>
                <td>{article.author.email}</td>
                <td>
                  <img
                    src={article.author.image}
                    className="w-10 h-10 rounded-full"
                    alt="author"
                  />
                </td>
                <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                <td>{article.publisher}</td>
                <td className="capitalize">{article.status}</td>
                <td className="flex flex-wrap gap-2">
                  {article.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(article._id)}
                        className="btn btn-xs btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(article._id);
                          document.getElementById("decline_modal").showModal();
                        }}
                        className="btn btn-xs btn-error"
                      >
                        Decline
                      </button>
                    </>
                  )}
                  <Link to={`/article-details/${article._id}`}>
                    <button className="btn btn-xs btn-outline btn-warning">
                      Details
                    </button>
                  </Link>
                  {article.articleType !== "premium" &&
                    article.status === "published" && (
                      <button
                        onClick={() => handleMakePremium(article._id)}
                        className="btn btn-xs btn-accent"
                      >
                        Make Premium
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for Mobile */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {filteredArticles.map((article) => (
          <div
            key={article._id}
            className="card bg-base-200 shadow-md p-4 rounded-xl"
          >
            <h3 className="font-bold text-lg">{article.title}</h3>
            <div className="flex gap-3 items-center">
              <img
                src={article.author.image}
                className="w-10 h-10 rounded-full"
                alt="author"
              />
              <div>
                <p className="text-sm">{article.author.name}</p>
                <p className="text-xs text-gray-500">{article.author.email}</p>
              </div>
            </div>
            <p className="text-sm">
              <strong>Posted:</strong>{" "}
              {new Date(article.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm">
              <strong>Publisher:</strong> {article.publisher}
            </p>
            <p className="text-sm">
              <strong>Status:</strong> {article.status}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {article.status === "pending" && (
                <>
                  <button
                    onClick={() => handleApprove(article._id)}
                    className="btn btn-sm btn-success"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(article._id);
                      document.getElementById("decline_modal").showModal();
                    }}
                    className="btn btn-sm btn-error"
                  >
                    Decline
                  </button>
                </>
              )}
              <Link to={`/article-details/${article._id}`}>
                <button className="btn btn-sm btn-outline btn-warning">
                  Details
                </button>
              </Link>
              {article.articleType !== "premium" &&
                article.status === "published" && (
                  <button
                    onClick={() => handleMakePremium(article._id)}
                    className="btn btn-sm btn-accent"
                  >
                    Make Premium
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Decline Modal */}
      <dialog id="decline_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Decline Reason</h3>
          <textarea
            className="textarea textarea-bordered w-full mt-2"
            rows={4}
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            placeholder="Write reason here..."
          ></textarea>
          <div className="modal-action">
            <form method="dialog">
              <button
                type="button"
                onClick={handleDecline}
                className="btn btn-error btn-sm"
              >
                Submit Reason
              </button>
              <button className="btn btn-sm ml-2">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageArticles;
