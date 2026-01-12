import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { NoContent } from "@/types";

export type ConfirmPaymentInput = {
  orderId: number;
  data: {
    name?: string;
    account_name?: string;
    account_number?: string;
    account_username?: string;
    phone?: string;
  };
};

export type ConfirmPaymentResponse = NoContent;

export const confirmPayment = ({
  orderId,
  data,
}: ConfirmPaymentInput): Promise<ConfirmPaymentResponse> => {
  return api.post(`/orders/${orderId}/confirm_payment`, data);
};

type UseConfirmPaymentOptions = {
  mutationConfig?: MutationConfig<typeof confirmPayment>;
};

export const useConfirmPayment = ({
  mutationConfig,
}: UseConfirmPaymentOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      const variables = args[1];
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["order", variables.orderId], // Invalidate specific order query
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: confirmPayment,
  });
};
