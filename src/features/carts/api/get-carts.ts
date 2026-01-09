import { useQuery } from "@tanstack/react-query";
import type { CartItemTypes } from "@/types/cart";
import { getAuthToken } from "@/utils/functions";
import { QUERY_KEYS } from "@/utils/constans";
import { api } from "@/lib/api-client";

export const useGetCarts = () =>
  useQuery<CartItemTypes[]>({
    queryKey: [QUERY_KEYS.CARTS],
    queryFn: () => api.get("/carts"),
    enabled: !!getAuthToken(),
  });

