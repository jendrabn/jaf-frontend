import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { toast } from "react-toastify";
import type { Newsletter } from "@/types/landing";

export type SubscribeNewsletterInput = {
  email: string;
};

export interface NewsletterResponse {
  success: boolean;
  message: string;
  data: Newsletter;
}

export const subscribeNewsletter = ({
  data,
}: {
  data: SubscribeNewsletterInput;
}): Promise<NewsletterResponse> => {
  return api.post("/newsletter/subscribe", data);
};

export const useSubscribeNewsletter = () => {
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
