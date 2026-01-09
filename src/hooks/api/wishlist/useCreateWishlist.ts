import { useMutation } from "@tanstack/react-query";
import type { WishlistReqTypes } from "@/types/wishlist";
import { api } from "@/lib/api-client";

export const useCreateWishlist = () =>
  useMutation({
    mutationFn: (data: WishlistReqTypes) => api.post("/wishlist", data),
  });
