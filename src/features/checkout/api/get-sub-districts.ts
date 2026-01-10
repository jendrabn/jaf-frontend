import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { SubDistrictTypes } from "@/types/checkout";

// 1. Response Type (already defined in /types/region.ts as SubDistrictTypes[])
// export type GetSubDistrictsResponse = SubDistrictTypes[];

export const getSubDistricts = ({
  districtId,
}: {
  districtId: number;
}): Promise<SubDistrictTypes[]> => {
  return api.get(`/region/sub-districts/${districtId}`);
};

export const getSubDistrictsQueryOptions = (districtId: number) => {
  return queryOptions({
    queryKey: ["sub-districts", districtId],
    queryFn: () => getSubDistricts({ districtId }),
    staleTime: Infinity,
    enabled: !!districtId,
  });
};

export const useGetSubDistricts = (districtId?: number | null) => {
  return useQuery({
    ...getSubDistrictsQueryOptions(districtId || 0),
  });
};
