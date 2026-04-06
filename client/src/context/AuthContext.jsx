import {createContext, useContext, useState, useEffect} from "react";
import { useGetUserQuery } from "../features/api/userApi";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null)
      const [isAuthLoading, setIsAuthLoading] = useState(true);


    const {data, isSuccess, isError, refetch} = useGetUserQuery();
    
   useEffect(() => {
    if (isSuccess && data?.user) {
      setUser(data.user);
    }
    if (isSuccess || isError) {
      setIsAuthLoading(false);
    }
  }, [data, isSuccess, isError]);

    return (
        <AuthContext.Provider value={{user, isAuthLoading, refetchUser: refetch, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = ()=> useContext(AuthContext);