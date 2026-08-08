import axios from "axios";

// 1. Create the instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:1920", // Point this to your backend
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request Interceptor: Runs BEFORE the request is sent
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve the token from wherever you store it (localStorage, cookies, etc.)
    const token = localStorage.getItem("auth_token");

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

// 3. Response Interceptor: Runs AFTER the response is received
apiClient.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx triggers this function
    return response;
  },
  (error) => {
    // Any status code outside the range of 2xx triggers this function
    if (error.response?.status === 401) {
      // The token expired or is invalid.
      // Clear the local storage and force the user back to login.
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }

    // You can also handle 500 server errors globally here
    if (error.response?.status === 500) {
      console.error("A server error occurred.");
    }

    return Promise.reject(error);
  },
);
