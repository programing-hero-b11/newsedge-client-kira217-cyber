import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { saveUserInDb } from "../../utils/utils";
import useAuth from "../../hooks/useAuth";
import SocialGoogleLogin from "../../components/shared/SocialLogin/SocialGoogleLogin";

const Login = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const from = location.state || "/";
  console.log(from);

  // Handle login with email and password
  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;
    try {
      //User Login in the data base
      const result = await login(email, password);

      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };
      // update user in the data base
      await saveUserInDb(userData);
      toast.success("Login successful!");
      navigate(from);
    } catch (err) {
      toast.error("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="w-full max-w-md p-6 rounded-xl shadow-xl ">
        <h2 className="text-2xl font-bold text-center text-[#4C3AFF] mb-6">
          Login to NewsEdge
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="example@mail.com"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          {/* Password with Show/Hide Toggle */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="Your password"
                className="input input-bordered w-full pr-10"
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300"
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
            Login
          </button>
        </form>

        <div className="divider">or</div>

        {/* Google Login */}
        <SocialGoogleLogin></SocialGoogleLogin>

        {/* Redirect to Register */}
        <p className="mt-4 text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <a href="/register" className="text-[#4C3AFF] font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
