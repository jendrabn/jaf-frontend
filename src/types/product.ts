import type { Rating } from "./order";

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  products_count: number | null;
  logo: string | null;
}

export interface ProductBrand {
  id: number;
  name: string;
  slug: string;
  products_count: number | null;
  logo: string | null;
}

export interface ProductParams {
  page?: number;
  search?: string;
  sort_by?: "newest" | "oldest" | "sales" | "expensive" | "cheapest";
  category_id?: number;
  brand_id?: number;
  sex?: 1 | 2 | 3;
  min_price?: number;
  max_price?: number;
}

export interface ProductDiscount {
  id: number;
  name: string;
  description: string;
  promo_type: string;
  code: string;
  discount_type: "fixed" | "percentage";
  discount_amount: number;
  limit: number;
  limit_per_user: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  available_coupons: number;
  pivot: { product_id: number; coupon_id: number };
}

export interface ProductCoupon {
  id: number;
  name: string;
  description: string;
  promo_type: string;
  code: string;
  discount_type: "fixed" | "percentage";
  discount_amount: number;
  limit: number;
  limit_per_user: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  available_coupons: number;
  pivot: { product_id: number; coupon_id: number };
}

export interface ProductFlashSaleMeta {
  flash_sale_price?: number | null;
  flash_sale_end_at?: string | null;
  final_price?: number | null;
  is_in_flash_sale?: boolean;
  flash_price?: number | null;
  flash_price_display?: string | null;
  flash_stock?: number | null;
  flash_sold?: number | null;
  flash_stock_remaining?: number | null;
  max_qty_per_user?: number | null;
  is_flash_price_masked?: boolean;
}

export interface Product extends ProductFlashSaleMeta {
  id: number;
  name: string;
  slug: string;
  image: string;
  category: ProductCategory;
  brand: ProductBrand;
  sex: number | null;
  price: number;
  stock: number;
  weight: number;
  sold_count: number;
  is_wishlist: boolean;
  rating_avg: number;
  discount?: ProductDiscount | null;
  is_discounted: boolean;
  discount_in_percent: number;
  price_after_discount: number;
  flash_sale_price: number | null;
  is_in_flash_sale: boolean;
  final_price: number;
  flash_sale_end_at: string | null;
  coupons: ProductCoupon[];
}

export interface ProductDetail extends ProductFlashSaleMeta {
  id: number;
  name: string;
  slug: string;
  images: string[];
  category: ProductCategory;
  description: string;
  brand: ProductBrand;
  sex: number | null;
  price: number;
  stock: number;
  weight: number;
  sold_count: number;
  is_wishlist: boolean;
  rating_avg: number;
  discount?: ProductDiscount | null;
  is_discounted: boolean;
  discount_in_percent: number;
  price_after_discount: number;
  flash_sale_price: number | null;
  is_in_flash_sale: boolean;
  final_price: number;
  flash_sale_end_at: string | null;
  ratings: Rating[];
  sku: string;
}
