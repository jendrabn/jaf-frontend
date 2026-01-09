import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { BlogDetailTypes } from "@/types/blog";
import { QUERY_KEYS } from "@/utils/constans";

export const useFetchBlog = (slug?: string) =>
  useQuery<BlogDetailTypes>({
    queryKey: [QUERY_KEYS.BLOG, slug],
    queryFn: () => api.get(`/blogs/${slug}`),
    staleTime: Infinity,
    enabled: !!slug,
  });
