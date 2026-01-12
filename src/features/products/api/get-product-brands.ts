import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { ProductBrand } from "@/types/product";

export const getProductBrands = (): Promise<ProductBrand[]> => {
  return api.get("/brands");
};

export const getProductBrandsQueryOptions = () => {
  return queryOptions({
    queryKey: ["product-brands"],
    queryFn: () => getProductBrands(),
    staleTime: Infinity,
  });
};

export const useGetProductBrands = () => {
  return useQuery(getProductBrandsQueryOptions());
};
