import { useMutation } from "@tanstack/react-query";
import type { LoginReqTypes, LoginTypes } from "@/types/auth";
import { api } from "@/lib/api-client";

export const useLogin = () =>
  useMutation<LoginTypes, Error, LoginReqTypes>({
    mutationFn: (data) => api.post("/auth/login", data),
  });
