import { useMutation } from "@tanstack/react-query";
import type {
  ApplyCouponReqTypes,
  ApplyCouponResTypes,
} from "@/types/checkout";
import { api } from "@/lib/api-client";

export const useApplyCoupon = () =>
  useMutation<ApplyCouponResTypes, Error, ApplyCouponReqTypes>({
    mutationFn: (data) => api.post("/apply_coupon", data),
  });

