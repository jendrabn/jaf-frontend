import { useQuery } from "@tanstack/react-query";
import type { WishlistTypes } from "@/types/wishlist";
import { QUERY_KEYS } from "@/utils/constans";
import { api } from "@/lib/api-client";

export const useFetchWishlist = () =>
  useQuery<WishlistTypes[]>({
    queryKey: [QUERY_KEYS.WISHLISTS],
    queryFn: () => api.get("/wishlist"),
  });
