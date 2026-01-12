import {
  useQuery,
  useMutation,
  useQueryClient,
  queryOptions,
} from "@tanstack/react-query";
import {
  getNotifications as apiGetNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadCount as apiGetUnreadCount,
} from "./index";
import { toast } from "react-toastify";

// Query Options and Hooks
export const getNotificationsQueryOptions = (page: number = 1) => {
  return queryOptions({
    queryKey: ["notifications", page],
    queryFn: () => apiGetNotifications(page),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
  });
};

export const useGetNotifications = (page: number = 1) => {
  return useQuery({
    ...getNotificationsQueryOptions(page),
  });
};

// Mutation hooks with proper typing
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unread-count"] });
      toast("Notifikasi ditandai sebagai dibaca");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Gagal menandai notifikasi sebagai dibaca";
      toast(errorMessage);
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unread-count"] });
      toast("Semua notifikasi ditandai sebagai dibaca");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Gagal menandai semua notifikasi sebagai dibaca";
      toast(errorMessage);
    },
  });
};

export const getUnreadCountQueryOptions = () => {
  return queryOptions({
    queryKey: ["unread-count"],
    queryFn: async () => {
      const response = await apiGetUnreadCount();
      if (typeof response === "number") {
        return response;
      }
      if (response && typeof response === "object") {
        if ("data" in response && typeof response.data === "number") {
          return response.data;
        }
        if ("count" in response && typeof response.count === "number") {
          return response.count;
        }
      }

      return 0;
    },
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: 1000 * 60, // Auto refresh every 1 minute
  });
};

export const useGetUnreadCount = () => {
  return useQuery({
    ...getUnreadCountQueryOptions(),
  });
};
