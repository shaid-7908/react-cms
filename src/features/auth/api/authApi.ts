import { apiClient } from "@/lib/axios";

// Define the payload structure
export interface LoginPayload {
  email: string;
  password: string;
}

export const authLogin = async (data: LoginPayload) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};
