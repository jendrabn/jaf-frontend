import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { toast } from "react-toastify";
import type { NewsletterResponse } from "@/types/newsletter";

export const subscribeNewsletter = ({
  data,
}: {
  data: { email: string };
}): Promise<NewsletterResponse> => {
  return api.post("/newsletter/subscribe", data);
};

type UseSubscribeNewsletterOptions = {
  // No specific config needed for this hook
};

export const useSubscribeNewsletter =
  ({}: UseSubscribeNewsletterOptions = {}) => {
    return useMutation({
      mutationFn: subscribeNewsletter,
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error: unknown) => {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ||
          (error as Error).message ||
          "Failed to subscribe to newsletter";
        toast.error(errorMessage);
      },
    });
  };
