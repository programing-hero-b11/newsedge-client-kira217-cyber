import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/shared/Loading/Loading";
import { toast } from "react-toastify";
import { useState } from "react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-users");
      return data;
    },
  });

  const handleMakeAdmin = (userId) => {
    axiosSecure.patch(`/users/admin/${userId}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success("User is now an Admin!");
        refetch();
      }
    });
  };

  const handleRemoveAdmin = (userId) => {
    axiosSecure.patch(`/users/remove-admin/${userId}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success("User is now a Normal User!");
        refetch();
      }
    });
  };

  if (isLoading) return <Loading />;

  // 🔍 Email দিয়ে ফিল্টার
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="w-full px-2 sm:px-4 py-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">Manage Users</h2>

      {/* 🔎 Search Bar */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search by email..."
          className="input input-bordered w-full max-w-md"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* 📊 Table View (Desktop) */}
      <div className="hidden md:block">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={user.image}
                    alt="user"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="badge badge-success">Admin</span>
                  ) : (
                    <span className="badge badge-warning">User</span>
                  )}
                </td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user._id)}
                      className="btn btn-xs bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
                    >
                      Cancel Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-xs bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Card View (Mobile) */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map((user, index) => (
          <div
            key={user._id}
            className="bg-base-100 shadow-md rounded-lg p-4 border"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.image}
                alt="user"
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <p className="font-bold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span
                className={`badge ${
                  user.role === "admin" ? "badge-success" : "badge-warning"
                }`}
              >
                {user.role === "admin" ? "Admin" : "User"}
              </span>

              {user.role === "admin" ? (
                <button
                  onClick={() => handleRemoveAdmin(user._id)}
                  className="btn btn-xs bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
                >
                  Cancel Admin
                </button>
              ) : (
                <button
                  onClick={() => handleMakeAdmin(user._id)}
                  className="btn btn-xs bg-blue-500 text-white hover:bg-blue-600"
                >
                  Make Admin
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
