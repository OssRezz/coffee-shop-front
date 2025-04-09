import { SaleDetailProductInterface } from "./sale-detail-product-interface";

export interface SaleDetailInterface {
  productId: number;
  price: number;
  quantity: number;
  product: SaleDetailProductInterface;
}
