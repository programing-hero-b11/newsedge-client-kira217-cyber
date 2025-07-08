import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utils/utils";

const UpdateArticle = () => {
  const { id } = useParams(); // article id from url
  console.log(id);
  const navigate = useNavigate();
  const { user, themeController } = useAuth();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUploadError, setImageUploadError] = useState("");

  // Fetch publishers list
  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/publishers");
      return data;
    },
  });

  // Tags options
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

  // Load existing article data on mount
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axiosSecure(`/articles/${id}`);
        if (data) {
          // Prefill form fields
          reset({
            title: data.title,
            publisher: data.publisher,
            description: data.description,
          });

          // Set tags as react-select expects array of objects
          const selectedTags = data.tags.map((tag) => {
            return tagsOptions.find((opt) => opt.value === tag);
          });
          setValue("tags", selectedTags);

          // Set uploaded image preview
          setUploadedImage(data.image);
        }
      } catch (error) {
        toast.error("Failed to load article data");
      }
    };
    fetchArticle();
  }, [id, axiosSecure, reset, setValue]);

  // Custom react-select styles for dark/light mode (copy from AddArticle)
  const customStyles = (theme) => ({
    control: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#1E232B" : "white",
      borderColor: theme === "dark" ? "#555" : "#ccc",
      color: theme === "dark" ? "white" : "black",
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
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#444" : "#ddd",
      color: theme === "dark" ? "white" : "black",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: theme === "dark" ? "white" : "black",
    }),
    input: (provided) => ({
      ...provided,
      color: theme === "dark" ? "white" : "black",
    }),
  });

  const onSubmit = async (data) => {
    setUploading(true);
    try {
      let imageUrl = uploadedImage;

      // If user uploaded a new image file, upload it
      if (data.image && data.image.length > 0) {
        imageUrl = await imageUpload(data.image[0]);
      }

      const articleData = {
        title: data.title,
        image: imageUrl,
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

      const res = await axiosSecure.put(`/articles/${id}`, articleData);

      if (res.data.modifiedCount > 0) {
        toast.success("Article updated successfully!");
        navigate("/my-articles"); // redirect after update
      } else {
        toast.info("No changes were made");
      }
    } catch (err) {
      toast.error("Failed to update article");
    }
    setUploading(false);
  };

  // Handle image preview upload
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    try {
      const imageUrl = await imageUpload(file);
      setUploadedImage(imageUrl);
      setImageUploadError("");
    } catch (err) {
      setImageUploadError("Image upload failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Article</h2>
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
            {...register("image")}
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
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
          <p className="text-red-500 text-sm text-center">{imageUploadError}</p>
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
          {uploading ? "Updating..." : "Update Article"}
        </button>
      </form>
    </div>
  );
};

export default UpdateArticle;
