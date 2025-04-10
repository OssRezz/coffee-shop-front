import { HttpClient } from "../../../services/httpClient";
import { CheckoutInterface } from "../interfaces/checkout-interface";

export class CheckoutModel {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async checkout(data: CheckoutInterface) {
    const response = await this.httpClient.post<{
      data: {
        transactionId: string;
        reference: string;
        status: string;
      } | null;
      success: boolean;
      code: number;
      message: string;
    }>("/transactions/checkout", data);
    return response;
  }
}
