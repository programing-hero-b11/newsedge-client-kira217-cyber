import { useForm } from "react-hook-form";
import { imageUpload } from "../../../utils/utils";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaFileImage } from "react-icons/fa";

const AddPublisher = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const publisherInfo = {
        name: data.name,
        logo: uploadedImage,
      };

      // Save to DB
      await axiosSecure.post(`/publishers`, publisherInfo);
      toast.success("Publisher added successfully!");
      reset();
    } catch (error) {
      console.error("Image upload or DB save failed:", error);
      toast.error("Something went wrong!");
    }
    reset(); // reset react-hook-form fields
    setUploadedImage(null); // reset uploaded image
    setImageUploadError("");
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    console.log(image);
    try {
      // image url response from imgbb
      const imageUrl = await imageUpload(image);
      console.log(imageUrl);
      setUploadedImage(imageUrl);
    } catch (err) {
      setImageUploadError("Image Upload Failed");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-base-100 p-6 md:p-10 rounded-lg shadow-xl w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-[#4C3AFF]">
          Add Publisher
        </h2>

        {/* Publisher Name */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Publisher Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Publisher name is required" })}
            className="input input-bordered w-full"
            placeholder="Enter publisher name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Publisher Logo */}
        <div>
          <label className="cursor-pointer flex items-center gap-2">
            <span className="btn btn-primary w-full btn-outline">
              {uploadedImage ? (
                <span className="flex items-center gap-2">
                  <FaFileImage size={20} /> Change Image
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <FaFileImage /> Upload Image
                </span>
              )}
            </span>
            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </label>

          {uploadedImage && (
            <div className="w-full flex justify-center mt-5">
              <img
                src={uploadedImage}
                alt="Uploaded Preview"
                className="w-48 h-48 object-cover rounded border"
              />
            </div>
          )}
          {imageUploadError && (
            <p className="text-red-500 text-sm text-center">
              {imageUploadError}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full bg-[#4C3AFF] hover:bg-[#3729b4] text-white"
        >
          Add Publisher
        </button>
      </form>
    </div>
  );
};

export default AddPublisher;
