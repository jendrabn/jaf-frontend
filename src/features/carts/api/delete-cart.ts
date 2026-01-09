import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { NoContentTypes } from "@/types";

export type DeleteCartInput = {
  cart_ids: number[];
};

export type DeleteCartResponse = NoContentTypes;

export const deleteCart = ({
  data,
}: {
  data: DeleteCartInput;
}): Promise<DeleteCartResponse> => {
  return api.post("/carts?_method=DELETE", data);
};

type UseDeleteCartOptions = {
  mutationConfig?: MutationConfig<typeof deleteCart>;
};

export const useDeleteCart = ({
  mutationConfig,
}: UseDeleteCartOptions = {}) => {
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
    mutationFn: deleteCart,
  });
};
