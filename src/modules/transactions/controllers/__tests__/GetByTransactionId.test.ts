import { mapApiErrors } from "../../../../utils/mapApiErrors";
import { TransactionInterface } from "../../interfaces/transaction-interface";
import { TransactionModel } from "../../models/transaction.model";
import { GetByTransactionId } from "../get-by-transaction-id.controller";

// Mock dependencias
jest.mock("../../../../utils/env", () => ({
  getEnvBaseUrl: () => "https://mocked-api.com",
}));
jest.mock("../../../../utils/mapApiErrors");
jest.mock("../../models/transaction.model");

describe("GetByTransactionId controller", () => {
  const mockTransaction: TransactionInterface = {
    transactionId: "trx_001",
    reference: "ref_001",
    status: "APPROVED",
    createdAt: "2024-04-01T10:00:00Z",
    updatedAt: "2024-04-01T10:10:00Z",
    sales: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devuelve la transacción correctamente si existe", async () => {
    (TransactionModel as jest.Mock).mockImplementation(() => ({
      getByTransactionId: jest.fn().mockResolvedValue(mockTransaction),
    }));

    const result = await GetByTransactionId("trx_001");

    expect(result).toEqual({
      success: true,
      data: mockTransaction,
    });
  });

  it("devuelve error si la transacción no existe", async () => {
    (TransactionModel as jest.Mock).mockImplementation(() => ({
      getByTransactionId: jest.fn().mockResolvedValue(null),
    }));

    const result = await GetByTransactionId("trx_xxx");

    expect(result).toEqual({
      success: false,
      errors: ["Transacción no encontrada."],
    });
  });

  it("devuelve errores mapeados si ocurre una excepción", async () => {
    const mockErrors = ["Error inesperado"];
    const fakeError = { message: "Fallo en la petición" };

    (TransactionModel as jest.Mock).mockImplementation(() => ({
      getByTransactionId: jest.fn().mockRejectedValue(fakeError),
    }));

    (mapApiErrors as jest.Mock).mockReturnValue(mockErrors);

    const result = await GetByTransactionId("trx_500");

    expect(mapApiErrors).toHaveBeenCalledWith(fakeError);
    expect(result).toEqual({
      success: false,
      errors: mockErrors,
    });
  });
});
