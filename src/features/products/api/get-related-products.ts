import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { ProductItemTypes } from "@/types/product";

export const getRelatedProducts = ({
  productId,
}: {
  productId: string;
}): Promise<ProductItemTypes[]> => {
  return api.get(`/products/${productId}/similars`);
};

export const getRelatedProductsQueryOptions = (productId: string) => {
  return queryOptions({
    queryKey: ["related-products", productId],
    queryFn: () => getRelatedProducts({ productId }),
    enabled: !!productId,
  });
};

export const useGetRelatedProducts = (productId?: string) => {
  return useQuery(getRelatedProductsQueryOptions(productId || ""));
};
