import { UseAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, isAuthLoading, setUser, refetchUser } = UseAuthContext();
  return { user, isAuthLoading, setUser, refetchUser };
};

