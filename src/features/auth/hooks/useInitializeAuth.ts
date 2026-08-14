import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, logOut } from "../slices/authSlice";
import { authRefreshToken } from "../api/authApi";

export const useInitializeAuth = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialize = async () => {
      try {
        // Attempt to refresh the token using the HTTP-Only cookie
        const response = await authRefreshToken();
        const { user, accessToken, refreshToken } = response.data;
        
        // If successful, restore the user session in Redux
        dispatch(setCredentials({ user, accessToken, refreshToken }));
      } catch (error) {
        // If it fails (no cookie, expired cookie, etc), ensure Redux is cleared
        dispatch(logOut());
      } finally {
        // Mark initialization as complete so the app can render
        setIsInitialized(true);
      }
    };

    initialize();
  }, [dispatch]);

  return { isInitialized };
};
