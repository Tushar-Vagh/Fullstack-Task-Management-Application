import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signupApi } from "../../api/auth.api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { motion } from "framer-motion";
import authBg from "../../assets/auth-bg.jpg";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = async (data) => {
    try {
      setLoading(true);
      await signupApi({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success("Account created successfully");
      window.location.href = "/login";
    } catch {
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
  backgroundImage: `url(${authBg})`,
          filter: "blur(14px)",
        }}
      />

      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <form
          onSubmit={handleSubmit(submit)}
          className="card p-8 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 shadow-2xl rounded-2xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
            Create account
          </h2>

          <input
            {...register("name")}
            className="input"
            placeholder="Full name"
          />
          <p className="error">{errors.name?.message}</p>

=          <input
            {...register("email")}
            className="input"
            placeholder="Email address"
          />
          <p className="error">{errors.email?.message}</p>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="input pr-12"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 
                         text-gray-500 hover:text-gray-700
                         dark:text-gray-400 dark:hover:text-gray-200
                         transition"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
          <p className="error">{errors.password?.message}</p>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword")}
              className="input pr-12"
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 
                         text-gray-500 hover:text-gray-700
                         dark:text-gray-400 dark:hover:text-gray-200
                         transition"
            >
              {showConfirm ? "🙈" : "👁"}
            </button>
          </div>
          <p className="error">{errors.confirmPassword?.message}</p>

          <button
            disabled={loading}
            className="btn w-full mt-6 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-sm text-center mt-5 text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
