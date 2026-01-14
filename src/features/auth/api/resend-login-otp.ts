import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";

export type ResendLoginOtpInput = {
  email: string;
};

export type ResendLoginOtpResponse = {
  otp_required: boolean;
  otp_expires_at: string; // ISO timestamp when OTP expires
  otp_sent_to: string; // destination email
  otp_resend_available_at?: string; // ISO timestamp when resend is available
};

export const resendLoginOtp = ({
  data,
}: {
  data: ResendLoginOtpInput;
}): Promise<ResendLoginOtpResponse> => {
  return api.post("/auth/resend_login_otp", data);
};

type UseResendLoginOtpOptions = {
  mutationConfig?: MutationConfig<typeof resendLoginOtp>;
};

export const useResendLoginOtp = ({
  mutationConfig,
}: UseResendLoginOtpOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: resendLoginOtp,
  });
};
