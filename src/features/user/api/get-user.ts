import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";
import type { User } from "@/types/user";

export const getUser = (): Promise<User> => {
  return api.get("/account/me");
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
