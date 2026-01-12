import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { BlogDetail } from "@/types/blog";

export const getBlog = ({ slug }: { slug: string }): Promise<BlogDetail> => {
  return api.get(`/blogs/${slug}`);
};

export const getBlogQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: ["blog", slug],
    queryFn: () => getBlog({ slug }),
    staleTime: Infinity,
    enabled: !!slug,
  });
};

export const useGetBlog = (slug?: string) => {
  return useQuery({
    ...getBlogQueryOptions(slug || ""),
  });
};
