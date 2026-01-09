import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { ProductItemTypes } from "@/types/product";
import type { PageTypes } from "@/types";
import { QUERY_KEYS } from "@/utils/constans";

export const useFetchProducts = (queryString?: string) =>
  useQuery<{ data: ProductItemTypes[]; page: PageTypes }>({
    queryKey: [QUERY_KEYS.PRODUCTS, queryString],
    queryFn: () => api.get(`/products${queryString ? `?${queryString}` : ""}`),
  });
