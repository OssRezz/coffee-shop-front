import { SaleInterface } from "./sale-interface";

export interface TransactionInterface {
  transactionId: string;
  reference: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  sales: SaleInterface[] | null;
}
