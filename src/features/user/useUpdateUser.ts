import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export const useUpdateUser = () =>
  useMutation({
    mutationFn: (data: FormData) => api.post("/user?_method=PUT", data),
  });

