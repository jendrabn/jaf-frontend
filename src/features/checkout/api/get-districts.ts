import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { DistrictTypes } from "@/types/checkout";

export const getDistricts = ({
  cityId,
}: {
  cityId: number;
}): Promise<DistrictTypes[]> => {
  return api.get(`/region/districts/${cityId}`);
};

export const getDistrictsQueryOptions = (cityId: number) => {
  return queryOptions({
    queryKey: ["districts", cityId],
    queryFn: () => getDistricts({ cityId }),
    staleTime: Infinity,
    enabled: !!cityId,
  });
};

export const useGetDistricts = (cityId?: number | null) => {
  return useQuery({
    ...getDistrictsQueryOptions(cityId || 0),
  });
};
