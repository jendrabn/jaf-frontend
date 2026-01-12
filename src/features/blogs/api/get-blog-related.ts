import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Blog } from "@/types/blog";

export type GetBlogRelatedParams = {
  slug: string;
  limit?: number;
};

export type GetBlogRelatedResponse = Blog[];

export const getBlogRelated = ({
  slug,
  params,
}: {
  slug: string;
  params?: Omit<GetBlogRelatedParams, "slug">;
}): Promise<GetBlogRelatedResponse> => {
  const queryString = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return api.get(
    `/blogs/${slug}/related${queryString ? `?${queryString}` : ""}`
  );
};

export const getBlogRelatedQueryOptions = (
  slug: string,
  params?: Omit<GetBlogRelatedParams, "slug">
) => {
  return queryOptions({
    queryKey: ["blogs-related", slug, params],
    queryFn: () => getBlogRelated({ slug, params }),
    staleTime: Infinity,
    enabled: !!slug,
  });
};

export const useGetBlogRelated = (
  slug?: string,
  params?: Omit<GetBlogRelatedParams, "slug">
) => {
  return useQuery({
    ...getBlogRelatedQueryOptions(slug || "", params),
  });
};
