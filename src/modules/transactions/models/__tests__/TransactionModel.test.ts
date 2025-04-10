import { HttpClient } from "../../../../services/httpClient";
import { TransactionInterface } from "../../interfaces/transaction-interface";
import { TransactionModel } from "../transaction.model";

describe("TransactionModel", () => {
  const mockTransaction: TransactionInterface = {
    transactionId: "trx_001",
    reference: "ref_001",
    status: "APPROVED",
    createdAt: "2024-04-01T10:00:00Z",
    updatedAt: "2024-04-01T10:10:00Z",
    sales: [
      {
        id: 1,
        totalAmount: 30000,
        address: "Calle 123",
        details: [
          {
            productId: 1,
            price: 15000,
            quantity: 2,
            product: {
              id: 1,
              name: "Café Especial",
              price: 15000,
              image: "cafe.jpg",
            },
          },
        ],
      },
    ],
  };

  it("retorna la transacción correctamente si existe", async () => {
    const httpClient = {
      get: jest.fn().mockResolvedValue({
        success: true,
        code: 200,
        message: "OK",
        data: mockTransaction,
      }),
    } as unknown as HttpClient;

    const model = new TransactionModel(httpClient);
    const result = await model.getByTransactionId("trx_001");

    expect(httpClient.get).toHaveBeenCalledWith("/transactions/trx_001");
    expect(result).toEqual(mockTransaction);
  });

  it("retorna null si la transacción no existe", async () => {
    const httpClient = {
      get: jest.fn().mockResolvedValue({
        success: false,
        code: 404,
        message: "No encontrada",
        data: null,
      }),
    } as unknown as HttpClient;

    const model = new TransactionModel(httpClient);
    const result = await model.getByTransactionId("trx_xxx");

    expect(result).toBeNull();
  });
});
