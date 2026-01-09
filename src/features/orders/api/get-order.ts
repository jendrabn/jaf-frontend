import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { OrderDetailTypes } from "@/types/order";
import { QUERY_KEYS } from "@/utils/constans";
import { getAuthToken } from "@/utils/functions";

export const useGetOrder = (orderId?: number) =>
  useQuery<OrderDetailTypes>({
    queryKey: [QUERY_KEYS.ORDER, orderId],
    queryFn: () => api.get(`/orders/${orderId}`),
    enabled: !!getAuthToken() && !!orderId,
  });

