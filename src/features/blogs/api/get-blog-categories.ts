import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { BlogCategoryTypes } from "@/types/blog";
import { QUERY_KEYS } from "@/utils/constans";

export const useGetBlogCategories = () =>
  useQuery<BlogCategoryTypes[]>({
    queryKey: [QUERY_KEYS.BLOG_CATEGORIES],
    queryFn: () => api.get("/blogs/categories"),
    staleTime: Infinity,
  });

