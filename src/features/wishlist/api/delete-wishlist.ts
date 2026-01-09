import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { NoContentTypes } from "@/types";

export type DeleteWishlistResponse = NoContentTypes;

export const deleteWishlist = ({
  data,
}: {
  data: { wishlist_ids: number[] };
}): Promise<DeleteWishlistResponse> => {
  return api.post("/wishlist?_method=DELETE", data);
};

type UseDeleteWishlistOptions = {
  mutationConfig?: MutationConfig<typeof deleteWishlist>;
};

export const useDeleteWishlist = ({
  mutationConfig,
}: UseDeleteWishlistOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteWishlist,
  });
};
