import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export const useConfirmOrderReceived = () =>
  useMutation({
    mutationFn: (orderId: number) =>
      api.put(`/orders/${orderId}/confirm_order_delivered`),
  });

