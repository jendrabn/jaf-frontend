import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { FlashSaleScheduleTypes } from "@/types/flash-sale";

export const getFlashSales = (): Promise<FlashSaleScheduleTypes[]> => {
  return api.get("/flash-sale");
};

export const getFlashSalesQueryOptions = () => {
  return queryOptions({
    queryKey: ["flash-sales"],
    queryFn: () => getFlashSales(),
  });
};

export const useGetFlashSales = (
  config?: QueryConfig<typeof getFlashSalesQueryOptions>
) => {
  return useQuery({
    ...getFlashSalesQueryOptions(),
    ...config,
  });
};
