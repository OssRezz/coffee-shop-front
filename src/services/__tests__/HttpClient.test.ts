import { handleResponse } from "../../utils/handleResponse";
import { HttpClient } from "../httpClient";

jest.mock("../../utils/env", () => ({
  getEnvBaseUrl: () => "https://mocked-api.com",
}));
jest.mock("../../utils/handleResponse");
global.fetch = jest.fn();

const mockResponse = new Response(JSON.stringify({ success: true }), {
  status: 200,
  headers: { "Content-Type": "application/json" },
});

describe("HttpClient", () => {
  const BASE_URL = "https://api.test.com";
  const client = new HttpClient(BASE_URL);

  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue(mockResponse);
    (handleResponse as jest.Mock).mockResolvedValue({ success: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("realiza una solicitud GET", async () => {
    await client.get("/products");
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/products`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    expect(handleResponse).toHaveBeenCalled();
  });

  it("realiza una solicitud POST con body", async () => {
    const data = { name: "Café" };
    await client.post("/products", data);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  });

  it("realiza una solicitud PUT con body", async () => {
    const data = { name: "Actualizado" };
    await client.put("/products/1", data);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/products/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  });

  it("realiza una solicitud DELETE", async () => {
    await client.delete("/products/1");
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/products/1`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  });
});
