import axios from "axios";
import { store } from "@/store";
import { setCredentials, logOut } from "@/features/auth/slices/authSlice";
import { authRefreshToken } from "@/features/auth/api/authApi";

// 1. Create the instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:1920", // Point this to your backend using localhost instead of 127.0.0.1
  timeout: 10000,
  withCredentials: true, // Required for cookies in cross-origin requests
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request Interceptor: Runs BEFORE the request is sent
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve the token from the Redux store
    const token = store.getState().auth.accessToken;

    if (token && config.headers) {
      // Attach it to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 3. Response Interceptor: Runs AFTER the response is received
apiClient.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx triggers this function
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Any status code outside the range of 2xx triggers this function
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await authRefreshToken();
        const { user, accessToken, refreshToken } = response.data;
        
        // Update Redux state with new token
        store.dispatch(setCredentials({ user, accessToken, refreshToken }));
        
        // Process queued requests
        processQueue(null, accessToken);
        
        // Retry the original failed request
        originalRequest.headers.Authorization = 'Bearer ' + accessToken;
        return apiClient(originalRequest);
      } catch (err) {
        // Refresh token failed or expired
        processQueue(err, null);
        store.dispatch(logOut());
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // You can also handle 500 server errors globally here
    if (error.response?.status === 500) {
      console.error("A server error occurred.");
    }

    return Promise.reject(error);
  },
);
