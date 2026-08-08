import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authLogin,type LoginPayload } from "../api/authApi";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authLogin(payload),
    onSuccess: () => {
      // Invalidate and refetch the issues list so the new ticket appears instantly
      queryClient.invalidateQueries({ queryKey: ["login-user"] });
    },
  });
};
