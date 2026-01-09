import { useMutation } from "@tanstack/react-query";
import type { ForgotPasswordReqTypes } from "@/types/auth";
import { api } from "@/lib/api-client";
import type { NoContentTypes } from "@/types";

export const useForgotPassword = () =>
  useMutation<NoContentTypes, Error, ForgotPasswordReqTypes>({
    mutationFn: (data) => api.post("/auth/forgot_password", data),
  });

