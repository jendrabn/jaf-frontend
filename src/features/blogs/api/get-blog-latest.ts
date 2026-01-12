import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Blog } from "@/types/blog";

export type GetBlogLatestParams = {
  limit?: number;
};

export type GetBlogLatestResponse = Blog[];

export const getBlogLatest = ({
  params,
}: { params?: GetBlogLatestParams } = {}): Promise<GetBlogLatestResponse> => {
  const queryString = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return api.get(`/blogs/latest${queryString ? `?${queryString}` : ""}`);
};

export const getBlogLatestQueryOptions = (params?: GetBlogLatestParams) => {
  return queryOptions({
    queryKey: params ? ["blogs-latest", params] : ["blogs-latest"],
    queryFn: () => getBlogLatest({ params }),
    staleTime: Infinity,
  });
};

export const useGetBlogLatest = (params?: GetBlogLatestParams) => {
  return useQuery(getBlogLatestQueryOptions(params));
};
