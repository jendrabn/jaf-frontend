import type { ProductCard } from "./product";

export interface CartItem {
  id: number;
  product: ProductCard;
  quantity: number;
}
