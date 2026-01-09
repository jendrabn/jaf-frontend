import { useMutation } from "@tanstack/react-query";
import type { CartReqTypes } from "@/types/cart";
import { AxiosError } from "axios";
import { api } from "@/lib/api-client";
import type { NoContentTypes } from "@/types";

export const useCreateCart = () =>
  useMutation<NoContentTypes, AxiosError, CartReqTypes>({
    mutationFn: (data) => api.post("/carts", data),
  });
