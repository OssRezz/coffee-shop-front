export interface PropsCartButton {
  product: {
    id: number;
    name: string;
    price: number;
    image?: string | null;
    quantity: number;
  };
}
