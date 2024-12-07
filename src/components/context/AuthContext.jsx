import AxiosBase from '@/lib/axios';
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext()

export const MyProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() =>  {

      async function fetchData() {
        try {
          const {data} = await AxiosBase.get("/auth/me",{
            credentials: "include",
          });
  
        } catch (error) {
           setAuthUser(null);
        }
        finally {
          setIsLoading(false);
        }
      }

      fetchData()
    
    }, [])
    
    
    return (
      <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export default AuthContext;
