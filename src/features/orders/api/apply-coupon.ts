import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { ApplyCouponResTypes } from "@/types/checkout";

export type ApplyCouponInput = {
  cart_ids?: number[];
  coupon_code?: string;
};

export const applyCoupon = ({
  data,
}: {
  data: ApplyCouponInput;
}): Promise<ApplyCouponResTypes> => {
  return api.post("/apply_coupon", data);
};

type UseApplyCouponOptions = {
  mutationConfig?: MutationConfig<typeof applyCoupon>;
};

export const useApplyCoupon = ({
  mutationConfig,
}: UseApplyCouponOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["carts"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: applyCoupon,
  });
};
