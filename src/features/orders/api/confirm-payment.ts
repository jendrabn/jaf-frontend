import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { ConfirmPaymentReqTypes } from "@/types/order";

export const useConfirmPayment = () =>
  useMutation({
    mutationFn: ({
      orderId,
      data,
    }: {
      orderId: number;
      data: ConfirmPaymentReqTypes;
    }) => api.post(`/orders/${orderId}/confirm_payment`, data),
  });

