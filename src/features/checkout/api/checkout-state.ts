import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { Checkout } from "@/types/checkout";

export type CheckoutStateInput = {
  cart_ids?: number[];
  shipping_address?: {
    name?: string;
    phone?: string;
    province_id?: number;
    city_id?: number;
    district_id?: number;
    subdistrict_id?: number;
    zip_code?: string;
    address?: string;
  };
  shipping_courier?: string;
  shipping_service?: string;
  payment_method?: string;
  bank_id?: number;
  ewallet_id?: number;
  note?: string;
  coupon_code?: string;
};

export const checkoutState = ({
  data,
}: {
  data: CheckoutStateInput;
}): Promise<Checkout> => {
  return api.post("/checkout", data);
};

type UseCheckoutStateOptions = {
  mutationConfig?: MutationConfig<typeof checkoutState>;
};

export const useCheckoutState = ({
  mutationConfig,
}: UseCheckoutStateOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["checkout"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: checkoutState,
  });
};
