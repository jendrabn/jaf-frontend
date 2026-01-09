import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { BlogTagTypes } from "@/types/blog";

export const getBlogTags = (): Promise<BlogTagTypes[]> => {
  return api.get("/blogs/tags");
};

export const getBlogTagsQueryOptions = () => {
  return queryOptions({
    queryKey: ["blog-tags"],
    queryFn: () => getBlogTags(),
    staleTime: Infinity,
  });
};

export const useGetBlogTags = () => {
  return useQuery({
    ...getBlogTagsQueryOptions(),
  });
};
