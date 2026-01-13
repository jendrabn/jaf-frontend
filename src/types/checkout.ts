import type { Cart } from "./cart";
import type { Bank, Ewallet, PaymentGateway } from "./payment-method";

export interface Province {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
}

export interface SubDistrict {
  id: number;
  name: string;
  zip_code: string;
}

export interface Checkout {
  shipping_address: Address;
  carts: Array<Cart>;
  shipping_methods: Array<ShippingCost>;
  payment_methods: {
    bank: Array<Bank>;
    ewallet: Array<Ewallet>;
    gateway?: PaymentGateway | null;
  };
  taxes: Array<Tax>;
  total_quantity: number;
  total_weight: number;
  total_price: number;
  total_tax: number;
  coupon?: Coupon | null;
}

export interface Tax {
  id: number;
  name: string;
  rate: string;
}

export type CouponPromoType = "limit" | "period" | "product";
export type CouponDiscountType = "fixed" | "percentage";

export interface Coupon {
  id: number;
  name: string;
  description: string | null;
  promo_type: CouponPromoType;
  code: string | null;
  discount_type: CouponDiscountType;
  discount_amount: number | string | null;
  discount_value?: number | string | null;
  computed_discount_amount?: number | null;
  limit: number | null;
  limit_per_user: number | null;
  available_coupons?: number | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApplyCouponRes {
  data: Coupon;
  message?: string;
  discount_amount?: number | string | null;
  total_price?: number | string | null;
}

export interface ShippingAddress {
  id: number;
  name: string;
  phone: string;
  province: Province;
  city: City;
  district: District;
  subdistrict: SubDistrict;
  zip_code: string;
  address: string;
}

export interface ShippingCost {
  courier: string;
  courier_name: string;
  service: string;
  service_name: string;
  cost: number;
  etd: string;
}

export interface DeliveryAddress {
  name: string;
  phone: string;
  province: Province;
  city: City;
  district: District;
  subdistrict: SubDistrict;
  zip_code: string;
  address: string;
}

export interface Address {
  id: number;
  name: string;
  phone: string;
  province: Province;
  city: City;
  district: District;
  subdistrict: SubDistrict;
  zip_code: string;
  address: string;
}
