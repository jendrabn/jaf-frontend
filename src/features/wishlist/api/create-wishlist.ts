import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { NoContent } from "@/types";

export type CreateWishlistInput = {
  product_id: number;
};

export type CreateWishlistResponse = NoContent;

export const createWishlist = ({
  data,
}: {
  data: CreateWishlistInput;
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
