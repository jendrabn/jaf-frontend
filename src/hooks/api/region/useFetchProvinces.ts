import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { ProvinceTypes } from "@/types/region";
import { QUERY_KEYS } from "@/utils/constans";

export const useFetchProvinces = () =>
  useQuery<ProvinceTypes[]>({
    queryKey: [QUERY_KEYS.PROVINCES],
    queryFn: () => api.get("/region/provinces"),
    staleTime: Infinity,
  });
