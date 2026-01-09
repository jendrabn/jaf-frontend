import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { UserTypes } from "@/types/user";
import { QUERY_KEYS } from "@/utils/constans";

export const useFetchUser = () => {
  return useQuery<UserTypes>({
    queryKey: [QUERY_KEYS.USER],
    queryFn: () => api.get("/user"),
    //
  });
};
