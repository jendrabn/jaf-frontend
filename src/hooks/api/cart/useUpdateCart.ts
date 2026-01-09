import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export const useUpdateCart = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: number; data: unknown }) =>
      api.put(`/carts/${id}`, data),
  });
