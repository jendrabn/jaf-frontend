import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { ProductDetail } from "@/types/product";

export const getProduct = ({
  slug,
}: {
  slug: string;
}): Promise<ProductDetail> => {
  return api.get(`/products/${slug}`);
};

export const getProductQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: ["product", slug],
    queryFn: () => getProduct({ slug }),
    enabled: !!slug,
  });
};

export const useGetProduct = (slug?: string) => {
  return useQuery(getProductQueryOptions(slug || ""));
};
