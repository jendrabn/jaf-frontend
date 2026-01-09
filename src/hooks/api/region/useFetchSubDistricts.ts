import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { CityTypes } from "@/types/region";
import { QUERY_KEYS } from "@/utils/constans";

export const useFetchSubDistricts = (districtId?: number | null) =>
  useQuery<CityTypes[]>({
    queryKey: [QUERY_KEYS.SUBDISTRICTS, districtId],
    queryFn: () => api.get(`/region/sub-districts/${districtId}`),
    staleTime: Infinity,
    enabled: !!districtId,
  });
