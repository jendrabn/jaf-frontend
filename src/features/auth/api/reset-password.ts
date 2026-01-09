import { useMutation } from "@tanstack/react-query";
import type { ResetPasswordReqTypes } from "@/types/auth";
import { api } from "@/lib/api-client";
import type { NoContentTypes } from "@/types";

export const useResetPassword = () =>
  useMutation<NoContentTypes, Error, ResetPasswordReqTypes>({
    mutationFn: (data) => api.put("/auth/reset_password", data),
  });

