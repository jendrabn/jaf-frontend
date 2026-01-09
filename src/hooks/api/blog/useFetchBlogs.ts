import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { BlogItemTypes } from "@/types/blog";
import type { PageTypes } from "@/types";
import { QUERY_KEYS } from "@/utils/constans";

export const useFetchBlogs = (queryString?: string) =>
  useQuery<{
    data: BlogItemTypes[];
    page: PageTypes;
  }>({
    queryKey: [QUERY_KEYS.BLOGS, queryString],
    queryFn: () => api.get(`/blogs${queryString ? `?${queryString}` : ""}`),
    staleTime: Infinity,
  });
