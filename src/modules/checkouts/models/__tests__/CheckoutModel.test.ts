import { HttpClient } from "../../../../services/httpClient";
import { CheckoutInterface } from "../../interfaces/checkout-interface";
import { CheckoutModel } from "../checkout.model";

describe("CheckoutModel", () => {
  const mockData: CheckoutInterface = {
    card: {
      cardNumber: "4242424242424242",
      cvc: "123",
      expMonth: "12",
      expYear: "2025",
      cardHolder: "James Coffee",
    },
    amountInCents: 30000,
    currency: "COP",
    installments: 1,
    customer: {
      documentNumber: "1234567890",
      name: "James Coffee",
      cellphone: "3010000000",
      email: "james@example.com",
      address: "Calle 123",
    },
    products: [
      {
        productId: 1,
        price: 15000,
        quantity: 2,
      },
    ],
  };

  const mockSuccessResponse = {
    success: true,
    code: 200,
    message: "Transacción aprobada",
    data: {
      transactionId: "trx_123456",
      reference: "ref_abc987",
      status: "APPROVED",
    },
  };

  const mockFailureResponse = {
    success: false,
    code: 400,
    message: "Pago rechazado",
    data: null,
  };

  it("envía correctamente los datos y retorna una transacción aprobada", async () => {
    const httpClient = {
      post: jest.fn().mockResolvedValue(mockSuccessResponse),
    } as unknown as HttpClient;

    const model = new CheckoutModel(httpClient);
    const result = await model.checkout(mockData);

    expect(httpClient.post).toHaveBeenCalledWith(
      "/transactions/checkout",
      mockData
    );
    expect(result).toEqual(mockSuccessResponse);
  });

  it("retorna null si la transacción fue rechazada", async () => {
    const httpClient = {
      post: jest.fn().mockResolvedValue(mockFailureResponse),
    } as unknown as HttpClient;

    const model = new CheckoutModel(httpClient);
    const result = await model.checkout(mockData);

    expect(result.data).toBeNull();
    expect(result.success).toBe(false);
    expect(result.code).toBe(400);
    expect(result.message).toBe("Pago rechazado");
  });
});
