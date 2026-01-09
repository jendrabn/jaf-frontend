import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { RatingReqTypes } from "@/types/order";

export const useAddRating = () =>
  useMutation({
    mutationFn: (data: RatingReqTypes[]) =>
      api.post("/orders/ratings", {
        ratings: data,
      }),
  });

