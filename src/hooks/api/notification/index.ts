import { api } from "@/lib/api-client";
import type {
  NotificationListResponse,
  UnreadCountResponse,
} from "@/types/notification";

export const fetchNotifications = async (
  page = 1
): Promise<NotificationListResponse> => {
  const response = await api.get<NotificationListResponse>(
    `/notifications?page=${page}`
  );

  return response as unknown as NotificationListResponse;
};

export const markNotificationAsRead = async (id: number) => {
  return api.put(`/notifications/${id}/read`);
};

export const markAllNotificationsAsRead = async () => {
  return api.put("/notifications/read-all");
};

export const getUnreadCount = async (): Promise<UnreadCountResponse> => {
  const response = await api.get("/notifications/unread-count");
  return response as UnreadCountResponse;
};

export const updateFcmToken = async (token: string | null) => {
  return api.put("/user/fcm-token", { fcm_token: token });
};
