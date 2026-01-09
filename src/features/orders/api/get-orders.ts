import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { OrderTypes } from "@/types/order";
import type { PageTypes } from "@/types";
import { QUERY_KEYS } from "@/utils/constans";

export const useGetOrders = (queryString?: string) =>
  useQuery<{ data: OrderTypes[]; page: PageTypes }>({
    queryKey: [QUERY_KEYS.ORDERS, queryString],
    queryFn: () => api.get(`/orders${queryString ? `?${queryString}` : ""}`),
  });

