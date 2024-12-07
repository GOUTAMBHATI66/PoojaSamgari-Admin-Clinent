import { useAuth } from "@/components/context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { authUser, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !authUser.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
