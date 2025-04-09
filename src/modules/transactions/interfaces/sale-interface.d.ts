import { SaleDetailInterface } from "./sale-detail-interface";

export interface SaleInterface {
  id: number;
  totalAmount: number;
  address: string;
  details: SaleDetailInterface[];
}
