import { useMutation } from "@tanstack/react-query";
import type { RegisterReqTypes, RegisterTypes } from "@/types/auth";
import { api } from "@/lib/api-client";

export const useRegister = () =>
  useMutation<RegisterTypes, Error, RegisterReqTypes>({
    mutationFn: (data) => api.post("/auth/register", data),
  });

