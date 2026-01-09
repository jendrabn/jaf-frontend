import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { NoContentTypes } from "@/types";

export type UpdateCartInput = {
  id: number;
  data: {
    quantity: number;
  };
};

export type UpdateCartResponse = NoContentTypes;

export const updateCart = ({
  id,
  data,
}: UpdateCartInput): Promise<UpdateCartResponse> => {
  return api.put(`/carts/${id}`, data);
};

type UseUpdateCartOptions = {
  mutationConfig?: MutationConfig<typeof updateCart>;
};

export const useUpdateCart = ({
  mutationConfig,
}: UseUpdateCartOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["carts"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateCart,
  });
};
