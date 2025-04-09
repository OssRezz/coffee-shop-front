import { HttpClient } from "../../../services/httpClient";
import { TransactionInterface } from "../interfaces/transaction-interface";

export class TransactionModel {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getByTransactionId(
    transactionId: string
  ): Promise<TransactionInterface | null> {
    const response = await this.httpClient.get<{
      data: TransactionInterface | null;
      success: boolean;
      code: number;
      message: string;
    }>(`/transactions/${transactionId}`);
    return response.data;
  }
}
