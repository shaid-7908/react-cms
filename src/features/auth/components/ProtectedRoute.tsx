import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If not logged in, redirect to login page.
    // "replace" prevents them from using the browser back button to return to the protected route.
    return <Navigate to="/login" replace />;
  }

  // If they are logged in, render the child routes
  return <Outlet />;
};
