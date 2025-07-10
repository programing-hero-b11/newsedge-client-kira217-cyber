import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { handlePremiumExpiry, imageUpload } from "../../utils/utils";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddArticle = () => {
 

  const { user, themeController } = useAuth();
  const { register, handleSubmit, control, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [loadingAccess, setLoadingAccess] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/publishers");
      return data;
    },
  });
   

  // Check permission before rendering form
  useEffect(() => {
    const checkLimit = async () => {
      if (user?.email) {
        try {
          const res = await axiosSecure.get(
            `/articles/count?email=${user.email}`
          );
          const count = res.data.count;

          const userRes = await axiosSecure.get(
            `/user/userStatus/${user.email}`
          );
          const userInfo = userRes.data;

          if (userInfo.userStatus === "normal" && count >= 1) {
            setIsAllowed(false);
            Swal.fire({
              icon: "info",
              title: "Premium Required",
              text: "Normal users can only post 1 article. Please upgrade to premium.",
              confirmButtonText: "Go to Subscription",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/subscription");
              }
            });
          } else {
            setIsAllowed(true);
          }
        } catch (err) {
          console.error("Limit check failed:", err);
          setIsAllowed(false);
        } finally {
          setLoadingAccess(false);
        }
      }
    };
    checkLimit();
  }, [user, axiosSecure, navigate]);

  const tagsOptions = [
    { value: "politics", label: "Politics" },
    { value: "sports", label: "Sports" },
    { value: "technology", label: "Technology" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health", label: "Health" },
    { value: "crime", label: "Crime" },
    { value: "business", label: "Business" },
    { value: "education", label: "Education" },
    { value: "environment", label: "Environment" },
    { value: "travel", label: "Travel" },
    { value: "weather", label: "Weather" },
  ];

  const customStyles = (theme) => ({
    control: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#1E232B" : "white",
      borderColor: theme === "dark" ? "#555" : "#ccc",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === "dark" ? "white" : "black",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#1E232B" : "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? theme === "dark"
          ? "#444"
          : "#eee"
        : theme === "dark"
        ? "#1E232B"
        : "white",
      color: theme === "dark" ? "white" : "black",
    }),
  });

  const onSubmit = async (data) => {
    if (!isAllowed) return;

    setUploading(true);
    try {
      const articleData = {
        title: data.title,
        image: uploadedImage,
        description: data.description,
        publisher: data.publisher,
        tags: data.tags.map((tag) => tag.value),
        author: {
          name: user.displayName,
          email: user.email,
          image: user.photoURL || "",
        },
        reason: "",
      };

      const res = await axiosSecure.post("/articles", articleData);
      if (res.data.insertedId) {
        toast.success("Article submitted for review!");
        navigate("/my-articles");
        reset();
        setUploadedImage(null);
      }
    } catch (err) {
      toast.error("Failed to submit article.");
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    try {
      const imageUrl = await imageUpload(image);
      setUploadedImage(imageUrl);
      setImageUploadError(false);
    } catch (err) {
      console.log(err);
      setImageUploadError(true);
    }
  };

  // 🔄 Wait for access check
  if (loadingAccess)
    return <div className="text-center p-10">Checking permissions...</div>;
  if (!isAllowed) return null;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Submit New Article
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Article Title"
          className="input input-bordered w-full"
        />

        <label className="cursor-pointer flex items-center gap-2">
          <span className="btn btn-primary w-full btn-outline">
            {uploadedImage ? "Change Image" : "Select Photo"}
          </span>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </label>

        {uploadedImage && (
          <div className="w-full flex justify-center">
            <img
              src={uploadedImage}
              alt="Uploaded Preview"
              className="w-48 h-48 object-cover rounded border"
            />
          </div>
        )}
        {imageUploadError && (
          <p className="text-red-500 text-sm text-center">
            Image Upload Failed
          </p>
        )}

        <select
          {...register("publisher", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select Publisher</option>
          {publishers.map((pub) => (
            <option key={pub._id} value={pub.name}>
              {pub.name}
            </option>
          ))}
        </select>

        <Controller
          name="tags"
          control={control}
          defaultValue={[]}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              options={tagsOptions}
              isMulti
              placeholder="Select tags"
              styles={customStyles(themeController)}
            />
          )}
        />

        <textarea
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full h-60"
          placeholder="Article Description"
        ></textarea>

        <button
          className="btn btn-primary btn-outline w-full"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit Article"}
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
