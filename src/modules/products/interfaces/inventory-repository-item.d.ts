import { Product } from "./product";

interface InventoryResponseItem {
  id: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}
