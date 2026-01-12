import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { ProductCategory } from "@/types/product";

export const getProductCategories = (): Promise<ProductCategory[]> => {
  return api.get("/categories");
};

export const getProductCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ["product-categories"],
    queryFn: () => getProductCategories(),
    staleTime: Infinity,
  });
};

export const useGetProductCategories = () => {
  return useQuery(getProductCategoriesQueryOptions());
};
