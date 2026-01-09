import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { BlogItemTypes } from "@/types/blog";
import type { PageTypes } from "@/types";

export type GetBlogsParams = {
  page?: number;
  search?: string;
  sort_by?: "newest" | "oldest" | "views";
  category_id?: number;
  tag_id?: number;
};

export type GetBlogsResponse = {
  data: BlogItemTypes[];
  page: PageTypes;
};

export const getBlogs = ({
  params,
}: { params?: GetBlogsParams } = {}): Promise<GetBlogsResponse> => {
  const queryString = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return api.get(`/blogs${queryString ? `?${queryString}` : ""}`);
};

export const getBlogsQueryOptions = (params?: GetBlogsParams) => {
  return queryOptions({
    queryKey: params ? ["blogs", params] : ["blogs"],
    queryFn: () => getBlogs({ params }),
    staleTime: Infinity,
  });
};

export const useGetBlogs = (params?: GetBlogsParams) => {
  return useQuery(getBlogsQueryOptions(params));
};
