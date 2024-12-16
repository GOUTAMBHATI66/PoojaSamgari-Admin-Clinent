import AxiosBase from "@/lib/axios";
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const MyProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await AxiosBase.get("/auth/user/me");
        console.log(data, "data of the user");
        setAuthUser(data);
      } catch (error) {
        setAuthUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  if (AuthContext === null) return;
  return useContext(AuthContext);
};
