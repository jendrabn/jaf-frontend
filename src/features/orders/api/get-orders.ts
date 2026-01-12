import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Order } from "@/types/order";
import type { Page } from "@/types";

export type GetOrdersParams = {
  page?: number;
  status?:
    | "pending_payment"
    | "pending"
    | "processing"
    | "on_delivery"
    | "completed"
    | "cancelled";
  sort_by?: "newest" | "oldest";
};

export type GetOrdersResponse = {
  data: Order[];
  page: Page;
};

export const getOrders = ({
  params,
}: { params?: GetOrdersParams } = {}): Promise<GetOrdersResponse> => {
  const queryString = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return api.get(`/orders${queryString ? `?${queryString}` : ""}`);
};

export const getOrdersQueryOptions = (params?: GetOrdersParams) => {
  return queryOptions({
    queryKey: params ? ["orders", params] : ["orders"],
    queryFn: () => getOrders({ params }),
  });
};

export const useGetOrders = (params?: GetOrdersParams) => {
  return useQuery({
    ...getOrdersQueryOptions(params),
  });
};
