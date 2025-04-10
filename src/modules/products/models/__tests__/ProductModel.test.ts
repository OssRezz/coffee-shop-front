import { ProductModel } from "../product.model";
import { HttpClient } from "../../../../services/httpClient";

const mockData = {
  success: true,
  code: 200,
  message: "OK",
  data: [
    {
      product: {
        id: 1,
        name: "Café Especial",
        description: "Un café premium",
        price: 15000,
        image: "cafe.jpg",
      },
      quantity: 20,
    },
    {
      product: {
        id: 2,
        name: "Café Tradicional",
        description: "Un café clásico",
        price: 12000,
        image: null,
      },
      quantity: 10,
    },
  ],
};

describe("ProductModel", () => {
  it("debe mapear correctamente los datos del inventario", async () => {
    const httpClient = {
      get: jest.fn().mockResolvedValue(mockData),
    } as unknown as HttpClient;

    const model = new ProductModel(httpClient);
    const result = await model.getAll();

    expect(httpClient.get).toHaveBeenCalledWith("/inventories");
    expect(result).toEqual([
      {
        id: 1,
        name: "Café Especial",
        description: "Un café premium",
        price: 15000,
        quantity: 20,
        image: "cafe.jpg",
      },
      {
        id: 2,
        name: "Café Tradicional",
        description: "Un café clásico",
        price: 12000,
        quantity: 10,
        image: null,
      },
    ]);
  });

  it("retorna un array vacío si no hay inventario", async () => {
    const httpClient = {
      get: jest.fn().mockResolvedValue({ ...mockData, data: [] }),
    } as unknown as HttpClient;

    const model = new ProductModel(httpClient);
    const result = await model.getAll();

    expect(result).toEqual([]);
  });
});
