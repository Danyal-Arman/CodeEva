import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (user && !user.isAccountVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};
export const LoggedInUser = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }
  return children;
};
