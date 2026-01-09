import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { CityTypes } from "@/types/region";
import { QUERY_KEYS } from "@/utils/constans";

export const useGetDistricts = (cityId?: number | null) =>
  useQuery<CityTypes[]>({
    queryKey: [QUERY_KEYS.DISTRICTS, cityId],
    queryFn: () => api.get(`/region/districts/${cityId}`),
    staleTime: Infinity,
    enabled: !!cityId,
  });

