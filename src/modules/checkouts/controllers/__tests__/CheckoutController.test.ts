import { mapApiErrors } from "../../../../utils/mapApiErrors";
import { CheckoutInterface } from "../../interfaces/checkout-interface";
import { CheckoutModel } from "../../models/checkout.model";
import { CheckoutController } from "../checkout.controller";

jest.mock("../../../../utils/env", () => ({
  getEnvBaseUrl: () => "https://mocked-api.com",
}));
jest.mock("../../models/checkout.model");
jest.mock("../../../../utils/mapApiErrors");

describe("CheckoutController", () => {
  const mockData: CheckoutInterface = {
    card: {
      cardNumber: "4111111111111111",
      cvc: "123",
      expMonth: "12",
      expYear: "2025",
      cardHolder: "John Tester",
    },
    amountInCents: 25000,
    currency: "COP",
    installments: 1,
    customer: {
      documentNumber: "123456789",
      name: "John Tester",
      cellphone: "3010000000",
      email: "john@test.com",
      address: "Calle Falsa 123",
    },
    products: [{ productId: 1, price: 12500, quantity: 2 }],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("retorna éxito si la transacción fue procesada correctamente", async () => {
    const mockRes = {
      data: {
        transactionId: "trx_123",
        reference: "ref_abc",
        status: "APPROVED",
      },
      success: true,
      code: 200,
      message: "Aprobado",
    };

    (CheckoutModel as jest.Mock).mockImplementation(() => ({
      checkout: jest.fn().mockResolvedValue(mockRes),
    }));

    const result = await CheckoutController(mockData);

    expect(result).toEqual({
      success: true,
      data: mockRes.data,
    });
  });

  it("retorna errores si la transacción falla", async () => {
    const mockErrors = ["Campo inválido", "Datos incompletos"];
    const fakeError = {
      message: "Invalid data",
      code: 422,
      data: [
        { field: "cardNumber" },
        { messages: { cardHolder: ["El titular es requerido"] } },
      ],
    };

    (CheckoutModel as jest.Mock).mockImplementation(() => ({
      checkout: jest.fn().mockRejectedValue(fakeError),
    }));

    (mapApiErrors as jest.Mock).mockReturnValue(mockErrors);

    const result = await CheckoutController(mockData);

    expect(mapApiErrors).toHaveBeenCalledWith(fakeError);
    expect(result).toEqual({
      success: false,
      errors: mockErrors,
    });
  });
});
