import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { NoContent } from "@/types/api";

export type DeleteWishlistInput = {
  wishlist_ids: number[];
};

export type DeleteWishlistResponse = NoContent;

export const deleteWishlist = ({
  data,
}: {
  data: DeleteWishlistInput;
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
