import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { CityTypes } from "@/types/region";
import { QUERY_KEYS } from "@/utils/constans";

export const useGetCities = (provinceId?: number | null) =>
  useQuery<CityTypes[]>({
    queryKey: [QUERY_KEYS.CITIES, provinceId],
    queryFn: () => api.get(`/region/cities/${provinceId}`),
    staleTime: Infinity,
    enabled: !!provinceId,
  });

