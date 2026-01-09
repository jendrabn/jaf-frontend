import { useMutation } from "@tanstack/react-query";
import type { ShippingCostReqTypes, ShippingCostTypes } from "@/types/checkout";
import { api } from "@/lib/api-client";

export const useFetchShippingCosts = () =>
  useMutation<ShippingCostTypes[], Error, ShippingCostReqTypes>({
    mutationFn: (data) => api.post("/shipping_costs", data),
  });
