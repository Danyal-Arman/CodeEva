import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, isAuthLoading, setUser, refetchUser } = useAuthContext();
  return { user, isAuthLoading, setUser, refetchUser };
};
