import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { BlogCategory } from "@/types/blog";

export const getBlogCategories = (): Promise<BlogCategory[]> => {
  return api.get("/blogs/categories");
};

export const getBlogCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ["blog-categories"],
    queryFn: () => getBlogCategories(),
    staleTime: Infinity,
  });
};

export const useGetBlogCategories = () => {
  return useQuery({
    ...getBlogCategoriesQueryOptions(),
  });
};
