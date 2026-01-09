import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { FlashSaleScheduleTypes } from "@/types/flash-sale";
import { QUERY_KEYS } from "@/utils/constans";

export const useGetFlashSales = () =>
  useQuery<FlashSaleScheduleTypes[]>({
    queryKey: [QUERY_KEYS.FLASH_SALES],
    queryFn: () => api.get("/flash-sale"),
  });

