import AuthContext from "@/components/context/AuthContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { authUser, isLoading } = useContext(AuthContext)

  if (isLoading) return <div>Loading...</div>;

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !authUser.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;