import { useAuth } from "@/components/context/AuthContext";
import { Loader } from "lucide-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { authUser, isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="h-screen w-full flex itc justify-center">
        <Loader size={30} className=" animate-spin" />
      </div>
    );

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !authUser.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
