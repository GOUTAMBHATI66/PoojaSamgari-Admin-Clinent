import { useAuth } from "@/components/context/AuthContext";
import AxiosBase from "@/lib/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const [isPending, setisPending] = useState(false);
  const { authUser, setAuthUser } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    setisPending(true);
    e.preventDefault();
    try {
      const { data } = await AxiosBase.post("/auth/user/logout");
      toast.success("Logout Successfully");
      navigate("/");
      setAuthUser(null);
    } catch (error) {
      console.error(error);
    } finally {
      setisPending(false);
    }
  };

  return {
    isPending,
    handleLogout,
  };
};
export default useLogout;
