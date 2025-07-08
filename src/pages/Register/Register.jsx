import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { imageUpload, saveUserInDb } from "../../utils/utils";
import SocialGoogleLogin from "../../components/shared/SocialLogin/SocialGoogleLogin";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { signUp, updateUser, setUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;
    const imageFile = photo[0];
    const photoUrl = await imageUpload(imageFile);

    // Password validation
    const passRegEx = {
      length: password.length >= 6,
      capital: /[A-Z]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      number: /\d/.test(password),
    };

    if (
      !passRegEx.length ||
      !passRegEx.capital ||
      !passRegEx.special ||
      !passRegEx.number
    ) {
      toast.error(
        "Password must be at least 6 characters and include a capital letter, special character, and number."
      );
      return;
    }

    try {
      // First time user register
      const result = await signUp(email, password);
      // save name and photo user profile
      await updateUser({ displayName: name, photoURL: photoUrl }).then(() => {
        setUser((prevUser) => {
          return {
            ...prevUser,
            displayName: name,
            photoURL: photoUrl,
          };
        });
      });
      console.log(result);

      //  Save the user in the data base
      const userData = {
        name,
        email,
        image: photoUrl,
      };
      // Save user data in db
      await saveUserInDb(userData);

      toast.success("Registered successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 ">
      <div className="w-full max-w-md p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#4C3AFF]">
          Register to NewsEdge
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">First Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Your name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="block font-medium mb-1">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("photo", { required: true })}
              className="file-input file-input-bordered w-full"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">Photo is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="example@gmail.com"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="Secure password"
                className="input input-bordered w-full pr-10"
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn w-full bg-[#4C3AFF] text-white hover:bg-[#372fd1]"
          >
            Register
          </button>
        </form>

        <div className="divider">or</div>

        <SocialGoogleLogin></SocialGoogleLogin>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-[#4C3AFF] font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
