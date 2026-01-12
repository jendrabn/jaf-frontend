import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";
import type { NoContent } from "@/types";

export type AddRatingInput = {
  ratings: {
    order_item_id: number;
    rating: number;
    comment: string;
    is_anonymous: boolean;
  }[];
};

export type AddRatingResponse = NoContent;

export const addRating = ({
  data,
}: {
  data: AddRatingInput;
}): Promise<AddRatingResponse> => {
  return api.post("/orders/ratings", data);
};

type UseAddRatingOptions = {
  mutationConfig?: MutationConfig<typeof addRating>;
};

export const useAddRating = ({ mutationConfig }: UseAddRatingOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: addRating,
  });
};
