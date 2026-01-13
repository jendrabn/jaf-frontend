import { api } from "@/lib/api-client";
import type { Page } from "@/types/api";
import type { Notification } from "@/types/notification";

export type GetNotificationsResponse = {
  data: Notification[];
  page: Page;
};

export const getNotifications = async (
  page = 1
): Promise<GetNotificationsResponse> => {
  const response = await api.get<GetNotificationsResponse>(
    `/notifications?page=${page}`
  );

  return response as unknown as GetNotificationsResponse;
};

export const markNotificationAsRead = async (id: number) => {
  return api.put(`/notifications/${id}/read`);
};

export const markAllNotificationsAsRead = async () => {
  return api.put("/notifications/read-all");
};

export interface UnreadCountResponse {
  data?: number;
}

export const getUnreadCount = async (): Promise<UnreadCountResponse> => {
  const response = await api.get("/notifications/unread-count");
  return response as UnreadCountResponse;
};

export const updateFcmToken = async (token: string | null) => {
  return api.put("/user/fcm-token", { fcm_token: token });
};
