import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { NoContentTypes } from "@/types";

export type UpdatePasswordResponse = NoContentTypes;

export const updatePassword = ({
  data,
}: {
  data: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
  };
}): Promise<UpdatePasswordResponse> => {
  return api.put("/user/change_password", data);
};

type UseUpdatePasswordOptions = {
  mutationConfig?: MutationConfig<typeof updatePassword>;
};

export const useUpdatePassword = ({
  mutationConfig,
}: UseUpdatePasswordOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updatePassword,
  });
};
