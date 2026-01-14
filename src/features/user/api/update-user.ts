import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { User } from "@/types/user";

export type UpdateUserInput = FormData;

export type UpdateUserResponse = User;

export const updateUser = ({
  data,
}: {
  data: UpdateUserInput;
}): Promise<UpdateUserResponse> => {
  return api.put("/account/me", data);
};

type UseUpdateUserOptions = {
  mutationConfig?: MutationConfig<typeof updateUser>;
};

export const useUpdateUser = ({
  mutationConfig,
}: UseUpdateUserOptions = {}) => {
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
    mutationFn: updateUser,
  });
};
