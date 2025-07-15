import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utils/utils";
import { toast } from "react-toastify";
import { FaImage } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
  const { user, updateUser, setUser } = useAuth();
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hovering, setHovering] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const userEmail = user?.email;

  useEffect(() => {
    if (userEmail) {
      axiosSecure(`/users/${userEmail}`)
        .then((res) => {
          setDbUser(res.data);
          reset({
            name: res.data?.name,
            email: res.data?.email,
          });
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Failed to fetch user data");
          setLoading(false);
        });
    }
  }, [userEmail, reset]);

  const onSubmit = async (data) => {
    try {
      let imageUrl = dbUser?.image;
      if (data.image && data.image.length > 0) {
        imageUrl = await imageUpload(data.image[0]);
      }

      const updatedUser = {
        name: data.name,
        image: imageUrl,
      };

      await updateUser({ displayName: data.name, photoURL: imageUrl });

      const res = await axiosSecure.put(`/users/${userEmail}`, updatedUser);

      if (res.data?.modifiedCount > 0) {
        toast.success("Profile updated successfully");
        setDbUser({ ...dbUser, ...updatedUser });
        setUser({ ...user, displayName: data.name, photoURL: imageUrl });
      } else {
        toast.success("Profile already up to date");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return <div className="p-6 text-center font-semibold">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 rounded-lg shadow-md mt-28">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#4C3AFF]">
        My Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Profile Picture with Hover */}
        <div
          className="relative w-24 h-24 mx-auto"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <img
            src={dbUser?.image}
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full border shadow-md transition duration-300"
          />
          {hovering && (
            <>
              <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-full cursor-pointer transition duration-300">
                <FaImage className="text-white text-xl mb-1" />
                <span className="text-white text-sm font-medium">
                  Change Photo
                </span>
                <input type="file" {...register("image")} className="hidden" />
              </label>
            </>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">Name is required</p>
          )}
        </div>

        {/* Email (Read-only) */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Role and Status */}
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block mb-1 font-medium">Role</label>
            <p className="py-2 px-4 rounded bg-blue-100 text-blue-700 inline-block">
              {dbUser?.role === "admin" ? "Admin" : "User"}
            </p>
          </div>
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <p
              className={`py-2 px-4 rounded inline-block ${
                dbUser?.userStatus === "premium"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {dbUser?.userStatus === "premium" ? "Premium" : "Normal"}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary btn-outline w-full transition duration-300 hover:scale-[1.02]"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
