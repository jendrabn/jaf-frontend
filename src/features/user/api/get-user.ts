import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { UserTypes } from "@/types/user";

export const getUser = (): Promise<UserTypes> => {
  return api.get("/user");
};

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
};

export const useGetUser = (
  config?: QueryConfig<typeof getUserQueryOptions>
) => {
  return useQuery({
    ...getUserQueryOptions(),
    ...config,
  });
};
