import { HttpClient } from "../../../services/httpClient";
import { InventoryResponseItem } from "../interfaces/inventory-repository-item";

export class ProductModel {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getAll() {
    const response = await this.httpClient.get<{
      data: InventoryResponseItem[];
      success: boolean;
      code: number;
      message: string;
    }>("/inventories");
    return response.data.map((inventory) => ({
      id: inventory.product.id,
      name: inventory.product.name,
      description: inventory.product.description,
      price: inventory.product.price,
      quantity: inventory.quantity,
      image: inventory.product.image,
    }));
  }
}
