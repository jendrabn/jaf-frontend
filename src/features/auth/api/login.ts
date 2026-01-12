import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { Login } from "@/types/auth";

export type LoginInput = {
  email: string;
  password: string;
};

export const login = ({ data }: { data: LoginInput }): Promise<Login> => {
  return api.post("/auth/login", data);
};

type UseLoginOptions = {
  mutationConfig?: MutationConfig<typeof login>;
};

export const useLogin = ({ mutationConfig }: UseLoginOptions = {}) => {
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
    mutationFn: login,
  });
};
