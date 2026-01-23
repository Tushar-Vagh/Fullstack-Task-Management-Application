import { useContext, useState } from "react";
import { loginApi } from "../../api/auth.api";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import authBg from "../../assets/auth-bg.jpg";


const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

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
      const res = await loginApi(data);
      login(res.data.token);
      toast.success("Login successful");
    } catch {
      toast.error("Invalid email or password");
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
        <div className="card p-8 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 shadow-2xl rounded-2xl">
          <form onSubmit={handleSubmit(submit)}>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Sign in
            </h2>

            <input
              {...register("email")}
              className="w-full input mb-1"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mb-3">
                {errors.email.message}
              </p>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full input pr-12 mb-1"
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
            {errors.password && (
              <p className="text-sm text-red-600 mb-4">
                {errors.password.message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn w-full mt-4 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-gray-500 mt-5 text-center">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
