import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { ProductItemTypes } from "@/types/product";
import { QUERY_KEYS } from "@/utils/constans";

export const useFetchRelatedProducts = (productId?: string) =>
  useQuery<ProductItemTypes[]>({
    queryKey: [QUERY_KEYS.RELATED_PRODUCTS, productId],
    queryFn: () => api.get(`/products/${productId}/similars`),
    enabled: !!productId,
  });
