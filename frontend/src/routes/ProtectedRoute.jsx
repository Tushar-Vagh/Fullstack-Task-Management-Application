import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;
  if (!user) return null;

  return <Outlet />;
}
