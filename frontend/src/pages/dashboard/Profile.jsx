import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
} from "../../api/user.api";
import api from "../../api/axios";
import DashboardLayout from "../../components/layout/DashboardLayout";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits")
    .optional()
    .or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  bio: z.string().max(200, "Bio max 200 characters").optional().or(z.literal("")),
});

 const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


export default function Profile() {
  const [tab, setTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const {
    register: registerPwd,
    handleSubmit: handlePwdSubmit,
    reset: resetPwd,
    formState: { errors: pwdErrors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    getProfile().then((res) => {
      const d = res.data;
      setValue("name", d.name || "");
      setValue("email", d.email || "");
      setValue("phone", d.phone || "");
      setValue("location", d.location || "");
      setValue("bio", d.bio || "");
      setImage(d.profile_image || null);
    });
  }, [setValue]);

  const submitProfile = async (data) => {
    try {
      setLoading(true);
      await updateProfile(data);
      toast.success("Profile updated");
    } catch {
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file) => {
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);

    try {
      const res = await api.post("/users/profile-picture", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImage(res.data.image);
      toast.success("Profile picture updated");
    } catch {
      toast.error("Image upload failed");
    }
  };

  const changePassword = async (data) => {
    try {
      await api.put("/auth/change-password", data);
      toast.success("Password changed");
      resetPwd();
    } catch {
      toast.error("Password change failed");
    }
  };

  const deleteAccount = async () => {
    if (!confirm("This action cannot be undone. Continue?")) return;
    try {
      await api.delete("/users/delete-account");
      localStorage.clear();
      window.location.href = "/login";
    } catch {
      toast.error("Account deletion failed");
    }
  };

 


  return (
    <DashboardLayout>
<div className="card p-6 fade-in">
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">
          Account Settings
        </h2>

        <div className="flex gap-4 mb-6">
          {["profile", "security", "danger"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
    tab === t
      ? "bg-blue-600 text-white shadow"
      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
  }`}
            >
              {t === "profile"
                ? "Profile"
                : t === "security"
                ? "Security"
                : "Danger Zone"}
            </button>
          ))}
        </div>

        {tab === "profile" && (
          <>
            <div className="mb-6">
              <img
                src={
                  image
      ? `https://backend-task-production-b560.up.railway.app${image}`
      : "https://via.placeholder.com/100"
                }
                alt="Profile"
className="w-24 h-24 rounded-full object-cover
  hover:scale-105 transition-all duration-300"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => uploadImage(e.target.files[0])}
              />
            </div>

            <form onSubmit={handleSubmit(submitProfile)}>
              <label>Full Name</label>
              <input {...register("name")} className="input" />
              <p className="error">{errors.name?.message}</p>

              <label>Email</label>
              <input
                {...register("email")}
                className="input bg-gray-100"
                disabled
              />

              <label>Phone</label>
              <input {...register("phone")} className="input" />
              <p className="error">{errors.phone?.message}</p>

              <label>Location</label>
              <input {...register("location")} className="input" />

              <label>About</label>
              <textarea {...register("bio")} rows={4} className="input" />

              <button className="btn mt-4" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </>
        )}

        {tab === "security" && (
          <form onSubmit={handlePwdSubmit(changePassword)}>
            <label>Current Password</label>
            <input
              type="password"
              {...registerPwd("currentPassword")}
              className="input"
            />
            <p className="error">{pwdErrors.currentPassword?.message}</p>

            <label>New Password</label>
            <input
              type="password"
              {...registerPwd("newPassword")}
              className="input"
            />

            <label>Confirm Password</label>
            <input
              type="password"
              {...registerPwd("confirmPassword")}
              className="input"
            />
            <p className="error">{pwdErrors.confirmPassword?.message}</p>

            <button className="btn mt-4">Change Password</button>
          </form>
        )}

        {tab === "danger" && (
          <div className="border border-red-500 p-4 rounded">
            <h3 className="text-red-600 font-semibold mb-2">
              Delete Account
            </h3>
            <p className="text-sm mb-4">
              This will permanently delete your account and data.
            </p>
            <button
              onClick={deleteAccount}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete Account
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
