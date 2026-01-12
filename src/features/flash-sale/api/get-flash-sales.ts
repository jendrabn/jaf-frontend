import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { FlashSaleSchedule } from "@/types/flash-sale";

export const getFlashSales = (): Promise<FlashSaleSchedule[]> => {
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
