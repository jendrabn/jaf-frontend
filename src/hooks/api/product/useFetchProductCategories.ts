import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { ProductCategoryTypes } from "@/types/product";
import { QUERY_KEYS } from "@/utils/constans";

export const useFetchProductCategories = () =>
  useQuery<ProductCategoryTypes[]>({
    queryKey: [QUERY_KEYS.PRODUCT_CATEGORIES],
    queryFn: () => api.get("/categories"),
    staleTime: Infinity,
  });
