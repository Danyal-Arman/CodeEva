import { useAuthContext } from "../context/AuthContext";

export const useUserBasic = () => {
  const { user, isAuthLoading, refetchUser } = useAuthContext();


  return {
    id: user?._id || "",
    username: user?.username || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    bio: user?.bio || "",
    website: user?.website || "",
    location: user?.location || "",
    createdAt: user?.createdAt || "",
    isAccountVerified: user?.isAccountVerified || false,
    isLoggedIn: !!user,
    isAuthLoading,
    refetchUser,
  };
};
