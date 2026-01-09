import { useMutation } from "@tanstack/react-query";
import type { LoginTypes } from "@/types/auth";
import { api } from "@/lib/api-client";

export type VerifyLoginOtpReq = {
  email: string;
  code: string; // 6-digit OTP code
};

export const useVerifyLoginOtp = () =>
  useMutation<LoginTypes, Error, VerifyLoginOtpReq>({
    mutationFn: (data) => api.post("/auth/verify_login_otp", data),
  });
