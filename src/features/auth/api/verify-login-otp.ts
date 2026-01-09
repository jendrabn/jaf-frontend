import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { LoginTypes } from "@/types/auth";

export type VerifyLoginOtpInput = {
  email: string;
  code: string; // 6-digit OTP code
};

export const verifyLoginOtp = ({
  data,
}: {
  data: VerifyLoginOtpInput;
}): Promise<LoginTypes> => {
  return api.post("/auth/verify_login_otp", data);
};

type UseVerifyLoginOtpOptions = {
  mutationConfig?: MutationConfig<typeof verifyLoginOtp>;
};

export const useVerifyLoginOtp = ({
  mutationConfig,
}: UseVerifyLoginOtpOptions = {}) => {
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
    mutationFn: verifyLoginOtp,
  });
};
