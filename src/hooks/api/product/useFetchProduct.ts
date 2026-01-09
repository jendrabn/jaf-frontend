import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { ProductDetailTypes } from "@/types/product";
import { QUERY_KEYS } from "@/utils/constans";

export const useFetchProduct = (slug?: string) =>
  useQuery<ProductDetailTypes>({
    queryKey: [QUERY_KEYS.PRODUCT, slug],
    queryFn: () => api.get(`/products/${slug}`),
    enabled: !!slug,
  });
