import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { BlogItemTypes } from "@/types/blog";

export type GetBlogPopularParams = {
  window?: "1d" | "7d" | "30d";
  limit?: number;
};

export type GetBlogPopularResponse = BlogItemTypes[];

export const getBlogPopular = ({
  params,
}: { params?: GetBlogPopularParams } = {}): Promise<GetBlogPopularResponse> => {
  const queryString = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return api.get(`/blogs/popular${queryString ? `?${queryString}` : ""}`);
};

export const getBlogPopularQueryOptions = (params?: GetBlogPopularParams) => {
  return queryOptions({
    queryKey: params ? ["blogs-popular", params] : ["blogs-popular"],
    queryFn: () => getBlogPopular({ params }),
    staleTime: Infinity,
  });
};

export const useGetBlogPopular = (params?: GetBlogPopularParams) => {
  return useQuery(getBlogPopularQueryOptions(params));
};
