import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { OrderSuccess } from "@/types/order";

export type CreateOrderInput = {
  cart_ids?: number[];
  shipping_address: {
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

export const createOrder = ({
  data,
}: {
  data: CreateOrderInput;
}): Promise<OrderSuccess> => {
  return api.post("/orders", data);
};

type UseCreateOrderOptions = {
  mutationConfig?: MutationConfig<typeof createOrder>;
};

export const useCreateOrder = ({
  mutationConfig,
}: UseCreateOrderOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["carts"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createOrder,
  });
};
