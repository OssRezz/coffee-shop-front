import { ProductModel } from "../../models/product.model";
import { getProducts } from "../get-products.controller";

jest.mock("../../../../utils/env", () => ({
  getEnvBaseUrl: () => "https://mocked-api.com",
}));
jest.mock("../../models/product.model");

describe("getProducts", () => {
  it("debe obtener productos desde el modelo", async () => {
    const mockProducts = [
      {
        id: 1,
        name: "Café Especial",
        description: "Descripción",
        price: 10000,
        quantity: 5,
        image: null,
      },
    ];

    // Forzamos implementación del método getAll del mock
    (ProductModel as jest.Mock).mockImplementation(() => ({
      getAll: jest.fn().mockResolvedValue(mockProducts),
    }));

    const result = await getProducts();

    expect(result).toEqual(mockProducts);
    expect(ProductModel).toHaveBeenCalledTimes(1);
  });
});
