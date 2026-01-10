import type { ProductItem } from "./product";

export interface CartItem {
  id: number;
  product: ProductItem;
  quantity: number;
}



