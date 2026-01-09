import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { PasswordReqTypes } from "@/types/user";

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: (data: PasswordReqTypes) =>
      api.put("/user/change_password", data),
  });
