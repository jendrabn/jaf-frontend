import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { NoContent } from "@/types";

export type ConfirmOrderReceivedInput = {
  orderId: number;
};

export type ConfirmOrderReceivedResponse = NoContent;

export const confirmOrderReceived = ({
  orderId,
}: ConfirmOrderReceivedInput): Promise<ConfirmOrderReceivedResponse> => {
  return api.put(`/orders/${orderId}/confirm_order_delivered`);
};

type UseConfirmOrderReceivedOptions = {
  mutationConfig?: MutationConfig<typeof confirmOrderReceived>;
};

export const useConfirmOrderReceived = ({
  mutationConfig,
}: UseConfirmOrderReceivedOptions = {}) => {
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
    mutationFn: confirmOrderReceived,
  });
};
