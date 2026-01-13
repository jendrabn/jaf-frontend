import type { Product } from "./product";

export interface OrderItem {
  id: number;
  product: Product;
  name: string;
  price: number;
  price_before_discount?: number | null;
  price_after_discount?: number | null;
  discount_in_percent?: number | null;
  weight: number;
  quantity: number;
  rating: Rating | null;
}

export interface Order {
  id: number;
  items: Array<OrderItem>;
  status: string;
  total_amount: number;
  payment_due_date: string;
  created_at: string;
  payment?: {
    method: string;
    info?: PaymentInfo;
    status?: string;
  };
}

export interface OrderParams {
  page?: number;
  status?:
    | "pending_payment"
    | "pending"
    | "processing"
    | "on_delivery"
    | "completed"
    | "cancelled";
  sort_by?: "newest" | "oldest";
}

export interface OrderDetail {
  id: number;
  items: Array<OrderItem>;
  invoice: {
    id: number;
    number: string;
    amount: number;
    due_date: string;
    status: string;
  };
  payment: {
    id: number;
    method: string;
    info: PaymentInfo;
    amount: number;
    status: string;
  };
  shipping_address: {
    name: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    postal_code: string;
    address: string;
  };
  shipping: {
    id: number;
    courir: string;
    courier_name: string;
    service: string;
    service_name: string;
    etd: string;
    tracking_number: string;
    status: string;
  };
  note: string;
  cancel_reason: string;
  status: string;
  total_quantity: number;
  total_weight: number;
  total_price: number;
  tax_amount: number;
  tax_name: string;

  gateway_fee?: number;
  gateway_fee_name?: string;

  discount: number;
  discount_name: string;
  shipping_cost: number;
  total_amount: number;
  payment_due_date: string;
  confirmed_at: string;
  shipped_at: string;
  completed_at: string;
  cancelled_at: string;
  created_at: string;
}

export interface PaymentInfo {
  name?: string;
  code?: string;
  account_name?: string;
  account_number?: string;
  account_username?: string;
  phone?: string;
  client_key?: string;
  snap_token?: string;
  redirect_url?: string;
}

export interface OrderSuccess {
  id: number;
  total_amount: number;
  payment_method: string;
  payment_info: {
    name: string;
    code: string;
    account_name: number;
    account_number: string;
  };
  payment_due_date: string;
  created_at: string;
}

export interface Rating {
  order_item_id: number;
  rating: number;
  comment: string;
  is_anonymous: boolean;
  username: string;
  created_at: string;
}
