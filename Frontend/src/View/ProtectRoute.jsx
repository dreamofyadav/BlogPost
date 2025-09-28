import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Please Login First!");
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
