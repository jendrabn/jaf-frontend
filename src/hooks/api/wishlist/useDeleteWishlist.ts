import { useMutation } from "@tanstack/react-query";
import type { DeleteWishlistReqTypes } from "@/types/wishlist";
import { api } from "@/lib/api-client";

export const useDeleteWishlist = () =>
  useMutation({
    mutationFn: (data: DeleteWishlistReqTypes) =>
      api.post("/wishlist?_method=DELETE", data),
  });
