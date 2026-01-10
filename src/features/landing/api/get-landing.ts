import { useQuery, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { ProductItemTypes } from "@/types/product";
import type { BannerTypes } from "@/types/landing";
import type { BlogItemTypes } from "@/types/blog";
import type { QueryConfig } from "@/lib/react-query";

export type GetLandingResponse = {
  products: ProductItemTypes[];
  banners: BannerTypes[];
  blogs: BlogItemTypes[];
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
