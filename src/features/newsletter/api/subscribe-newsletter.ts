import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { toast } from "react-toastify";
import type { NewsletterRequest, NewsletterResponse } from "@/types/newsletter";

const useSubscribeNewsletter = () =>
  useMutation<NewsletterResponse, Error, NewsletterRequest>({
    mutationFn: (data: NewsletterRequest) =>
      api.post("/newsletter/subscribe", data),
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

export default useSubscribeNewsletter;

