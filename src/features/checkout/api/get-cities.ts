import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { CityTypes } from "@/types/checkout";

export const getCities = ({
  provinceId,
}: {
  provinceId: number;
}): Promise<CityTypes[]> => {
  return api.get(`/region/cities/${provinceId}`);
};

export const getCitiesQueryOptions = (provinceId: number) => {
  return queryOptions({
    queryKey: ["cities", provinceId],
    queryFn: () => getCities({ provinceId }),
    staleTime: Infinity,
    enabled: !!provinceId,
  });
};

export const useGetCities = (provinceId?: number | null) => {
  return useQuery({
    ...getCitiesQueryOptions(provinceId || 0),
  });
};
