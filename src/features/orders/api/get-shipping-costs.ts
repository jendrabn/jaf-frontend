import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { ShippingCostReqTypes, ShippingCostTypes } from "@/types/checkout";

export type GetShippingCostsInput = ShippingCostReqTypes;

export const getShippingCosts = ({
  data,
}: {
  data: GetShippingCostsInput;
}): Promise<ShippingCostTypes[]> => {
  return api.post("/shipping_costs", data);
};

type UseGetShippingCostsOptions = {
  mutationConfig?: MutationConfig<typeof getShippingCosts>;
};

export const useGetShippingCosts = ({
  mutationConfig,
}: UseGetShippingCostsOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["shipping-costs"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: getShippingCosts,
  });
};
