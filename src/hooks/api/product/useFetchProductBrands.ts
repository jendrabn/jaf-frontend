import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { ProductBrandTypes } from "@/types/product";
import { QUERY_KEYS } from "@/utils/constans";

export const useFetchProductBrands = () =>
  useQuery<ProductBrandTypes[]>({
    queryKey: [QUERY_KEYS.PRODUCT_BRANDS],
    queryFn: () => api.get("/brands"),
    staleTime: Infinity,
  });
