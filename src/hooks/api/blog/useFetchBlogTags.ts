import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { BlogTagTypes } from "@/types/blog";
import { QUERY_KEYS } from "@/utils/constans";

export const useFetchBlogTags = () =>
  useQuery<BlogTagTypes[]>({
    queryKey: [QUERY_KEYS.BLOG_TAGS],
    queryFn: () => api.get("/blogs/tags"),
    staleTime: Infinity,
  });
