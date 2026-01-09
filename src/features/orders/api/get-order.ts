import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { OrderDetailTypes } from "@/types/order";
import { getAuthToken } from "@/utils/functions";

export const getOrder = ({
  orderId,
}: {
  orderId: number;
}): Promise<OrderDetailTypes> => {
  return api.get(`/orders/${orderId}`);
};

export const getOrderQueryOptions = (orderId: number) => {
  return queryOptions({
    queryKey: ["order", orderId],
    queryFn: () => getOrder({ orderId }),
    enabled: !!getAuthToken() && !!orderId,
  });
};

export const useGetOrder = (orderId?: number) => {
  return useQuery({
    ...getOrderQueryOptions(orderId || 0),
  });
};
