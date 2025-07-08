import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { imageUpload } from "../../utils/utils";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, updateUser, setUser } = useAuth(); // from your context
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/${userEmail}`)
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

      // Update Firebase Auth
      await updateUser({ displayName: data.name, photoURL: imageUrl });

      // Update backend
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${userEmail}`,
        updatedUser
      );

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
    <div>
      <div className="max-w-xl mx-auto p-4 rounded-lg shadow-md mt-14">
        <h2 className="text-2xl font-bold text-center mb-4 text-[#4C3AFF]">
          My Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-center">
            <img
              src={dbUser?.image}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto border"
            />
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

          {/* Email (read-only) */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              disabled
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium">
              Change Profile Photo
            </label>
            <input
              type="file"
              {...register("image")}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Role + Status */}
          <div className="flex gap-4">
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

          {/* Submit */}
          <button className="btn btn-primary w-full mt-4" type="submit">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
