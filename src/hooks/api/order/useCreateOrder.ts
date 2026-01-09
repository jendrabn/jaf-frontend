import { useMutation } from "@tanstack/react-query";
import type { OrderReqTypes, OrderSuccessTypes } from "@/types/order";
import { api } from "@/lib/api-client";

export const useCreateOrder = () =>
  useMutation<OrderSuccessTypes, Error, OrderReqTypes>({
    mutationFn: (data) => api.post("/orders", data),
  });
