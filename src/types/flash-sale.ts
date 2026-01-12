import type { ProductCard } from "./product";

export type FlashSaleStatus = "running" | "scheduled" | "completed" | string;

export interface FlashSaleItem extends ProductCard {
  flash_price?: number | null;
  flash_price_display?: string | null;
}

export interface FlashSaleSchedule {
  id: number;
  name: string;
  description: string;
  start_at: string;
  end_at: string;
  status: FlashSaleStatus;
  status_label: string;
  status_color: string;
  is_active: boolean;
  products: FlashSaleItem[];
}
