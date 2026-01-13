import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { NoContent } from "@/types/api";

export type CreateCartInput = {
  product_id: number;
  quantity: number;
};

export type CreateCartResponse = NoContent;

export const createCart = ({
  data,
}: {
  data: CreateCartInput;
}): Promise<CreateCartResponse> => {
  return api.post("/carts", data);
};

type UseCreateCartOptions = {
  mutationConfig?: MutationConfig<typeof createCart>;
};

export const useCreateCart = ({
  mutationConfig,
}: UseCreateCartOptions = {}) => {
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
    mutationFn: createCart,
  });
};
