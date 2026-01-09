import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { CartItemTypes } from "@/types/cart";
import { getAuthToken } from "@/utils/functions";

export const getCarts = (): Promise<CartItemTypes[]> => {
  return api.get("/carts");
};

export const getCartsQueryOptions = () => {
  return queryOptions({
    queryKey: ["carts"],
    queryFn: () => getCarts(),
    enabled: !!getAuthToken(),
  });
};

export const useGetCarts = () => {
  return useQuery({
    ...getCartsQueryOptions(),
  });
};
