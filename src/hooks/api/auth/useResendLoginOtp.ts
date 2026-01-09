import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export type ResendLoginOtpReq = {
  email: string;
};

export type ResendLoginOtpResp = {
  otp_required: boolean;
  otp_expires_at: string; // ISO timestamp when OTP expires
  otp_sent_to: string; // destination email
};

export const useResendLoginOtp = () =>
  useMutation<ResendLoginOtpResp, Error, ResendLoginOtpReq>({
    mutationFn: (data) => api.post("/auth/resend_login_otp", data),
  });
