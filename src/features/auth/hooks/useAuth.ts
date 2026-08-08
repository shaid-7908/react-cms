import { useAppSelector } from "@/store/hooks";

export const useAuth = () => {
  // Grab the auth state from the Redux store
  const authState = useAppSelector((state) => state.auth);

  // You can derive extra logic here if needed in the future
  // e.g., const isAdmin = authState.user?.role === 'admin';

  return authState; // Returns { isAuthenticated, user, token }
};
