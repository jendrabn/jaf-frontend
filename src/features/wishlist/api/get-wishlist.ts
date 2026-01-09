import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { WishlistTypes } from "@/types/wishlist";

// 1. Response Type (already defined in /types/wishlist.ts as WishlistTypes[])
// export type GetWishlistResponse = WishlistTypes[];

export const getWishlist = (): Promise<WishlistTypes[]> => {
  return api.get("/wishlist");
};

export const getWishlistQueryOptions = () => {
  return queryOptions({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(),
  });
};

export const useGetWishlist = (
  config?: QueryConfig<typeof getWishlistQueryOptions>
) => {
  return useQuery({
    ...getWishlistQueryOptions(),
    ...config,
  });
};
