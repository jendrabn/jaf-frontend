import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Province } from "@/types/checkout";

export const getProvinces = (): Promise<Province[]> => {
  return api.get("/region/provinces");
};

export const getProvincesQueryOptions = () => {
  return queryOptions({
    queryKey: ["provinces"],
    queryFn: () => getProvinces(),
    staleTime: Infinity,
  });
};

export const useGetProvinces = () => {
  return useQuery({
    ...getProvincesQueryOptions(),
  });
};
