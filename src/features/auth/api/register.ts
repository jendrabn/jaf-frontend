import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { RegisterTypes } from "@/types/auth";

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const register = ({
  data,
}: {
  data: RegisterInput;
}): Promise<RegisterTypes> => {
  return api.post("/auth/register", data);
};

type UseRegisterOptions = {
  mutationConfig?: MutationConfig<typeof register>;
};

export const useRegister = ({ mutationConfig }: UseRegisterOptions = {}) => {
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
    mutationFn: register,
  });
};
