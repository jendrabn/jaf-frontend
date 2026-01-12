import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { Wishlist } from "@/types/wishlist";

export const getWishlist = (): Promise<Wishlist[]> => {
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
