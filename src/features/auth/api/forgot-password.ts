import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { NoContentTypes } from "@/types";

export type ForgotPasswordInput = {
  email: string;
};

export type ForgotPasswordResponse = NoContentTypes;

export const forgotPassword = ({
  data,
}: {
  data: ForgotPasswordInput;
}): Promise<ForgotPasswordResponse> => {
  return api.post("/auth/forgot_password", data);
};

type UseForgotPasswordOptions = {
  mutationConfig?: MutationConfig<typeof forgotPassword>;
};

export const useForgotPassword = ({
  mutationConfig,
}: UseForgotPasswordOptions = {}) => {
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
    mutationFn: forgotPassword,
  });
};
