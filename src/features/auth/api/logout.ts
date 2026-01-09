import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export const useLogout = () =>
  useMutation({
    mutationFn: () => api.delete("/auth/logout"),
  });

