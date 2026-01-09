import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { NoContentTypes } from "@/types";

export type CreateWishlistResponse = NoContentTypes;

export const createWishlist = ({
  data,
}: {
  data: { product_id: number };
}): Promise<CreateWishlistResponse> => {
  return api.post("/wishlist", data);
};

type UseCreateWishlistOptions = {
  mutationConfig?: MutationConfig<typeof createWishlist>;
};

export const useCreateWishlist = ({
  mutationConfig,
}: UseCreateWishlistOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createWishlist,
  });
};
