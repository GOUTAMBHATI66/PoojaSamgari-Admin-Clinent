import { useAuth } from "@/components/context/AuthContext";
import AxiosBase from "@/lib/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    if (e) e.preventDefault();
    setIsPending(true);

    try {
      const { data } = await AxiosBase.post("/auth/user/logout");

      if (data.success) {
        toast.success("Logout Successfully");
        setAuthUser(null);
        navigate("/");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, handleLogout };
};

export default useLogout;
