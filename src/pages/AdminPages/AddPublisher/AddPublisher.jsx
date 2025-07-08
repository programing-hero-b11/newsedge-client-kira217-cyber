import { useForm } from "react-hook-form";
import { imageUpload } from "../../../utils/utils";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddPublisher = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = data.logo[0];

    const image = await imageUpload(imageFile);
    console.log(image)

    try {
      const publisherInfo = {
        name: data.name,
        logo: image,
      };

      // Save to DB
      await axiosSecure.post(`/publishers`, publisherInfo);
      toast.success("Publisher added successfully!");
      reset();
    } catch (error) {
      console.error("Image upload or DB save failed:", error);
      toast.error("Something went wrong!");
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
          <label className="label">
            <span className="label-text font-medium">Publisher Logo</span>
          </label>
          <input
            type="file"
            {...register("logo", { required: "Logo is required" })}
            accept="image/*"
            className="file-input file-input-bordered w-full"
          />
          {errors.logo && (
            <p className="text-red-500 text-sm mt-1">{errors.logo.message}</p>
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
