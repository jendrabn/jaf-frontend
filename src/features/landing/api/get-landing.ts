import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Product } from "@/types/product";
import type { Banner } from "@/types/landing";
import type { Blog } from "@/types/blog";
import type { QueryConfig } from "@/lib/react-query";

export type GetLandingResponse = {
  products: Product[];
  banners: Banner[];
  blogs: Blog[];
};

export const getLanding = (): Promise<GetLandingResponse> => {
  return api.get("/landing");
};

export const getLandingQueryOptions = () => {
  return queryOptions({
    queryKey: ["landing"],
    queryFn: () => getLanding(),
  });
};

export const useGetLanding = (
  config?: QueryConfig<typeof getLandingQueryOptions>
) => {
  return useQuery({
    ...getLandingQueryOptions(),
    ...config,
  });
};
