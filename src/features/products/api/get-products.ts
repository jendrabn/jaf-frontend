import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { ProductItemTypes } from "@/types/product";
import type { PageTypes } from "@/types";

export type GetProductsParams = {
  page?: number;
  search?: string;
  sort_by?: "newest" | "oldest" | "sales" | "expensive" | "cheapest";
  category_id?: number;
  brand_id?: number;
  sex?: 1 | 2 | 3;
  min_price?: number;
  max_price?: number;
};

export type GetProductsResponse = {
  data: ProductItemTypes[];
  page: PageTypes;
};

export const getProducts = ({
  params,
}: { params?: GetProductsParams } = {}): Promise<GetProductsResponse> => {
  const queryString = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return api.get(`/products${queryString ? `?${queryString}` : ""}`);
};

export const getProductsQueryOptions = (params?: GetProductsParams) => {
  return queryOptions({
    queryKey: params ? ["products", params] : ["products"],
    queryFn: () => getProducts({ params }),
  });
};

export const useGetProducts = (params?: GetProductsParams) => {
  return useQuery(getProductsQueryOptions(params));
};
