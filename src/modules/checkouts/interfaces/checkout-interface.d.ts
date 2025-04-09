import { CardInterface } from "../interfaces/card-interface";
import { CustomerInterface } from "../interfaces/customer-interface";
import { ProductCardInterface } from "../interfaces/product-card-interface";

interface CheckoutInterface {
  card: CardInterface;
  amountInCents: number;
  currency: string;
  installments: number;
  customer: CustomerInterface;
  products: ProductCardInterface[];
}
