import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export const useDeleteCart = () =>
  useMutation({
    mutationFn: (data: unknown) => api.post("/carts?_method=DELETE", data),
  });

