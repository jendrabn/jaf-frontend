import { useMutation } from "@tanstack/react-query";
import type { CheckoutReqTypes } from "@/types/checkout";
import { api } from "@/lib/api-client";

export const useCheckoutState = () =>
  useMutation({
    mutationFn: (data: CheckoutReqTypes) => api.post("/checkout", data),
  });

