import { apiClient } from "@/lib/axios";
import axios from "axios";

// Define the payload structure
export interface LoginPayload {
  email: string;
  password: string;
}

export const authLogin = async (data: LoginPayload) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

// Use raw axios here to prevent infinite interceptor loops
export const authRefreshToken = async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL || "http://localhost:1920"}/auth/refresh-token`,
    {},
    { withCredentials: true } // Crucial for sending the HTTP-Only cookie
  );
  return response.data;
};
