export interface NotificationMeta {
  status?: string;
  order_id?: number;
  total_price?: number;
  [key: string]: unknown;
}

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  body: string;
  category: string;
  level: "info" | "success" | "warning" | "error";
  url?: string;
  icon?: string;
  meta?: NotificationMeta;
  is_read: boolean;
  read_at?: string;
  created_at: string;
  updated_at: string;
}
