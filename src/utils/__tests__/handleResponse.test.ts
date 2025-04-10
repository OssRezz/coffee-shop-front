import { handleResponse } from "../handleResponse";

describe("handleResponse", () => {
  const mockJson = {
    success: false,
    message: "Invalid request",
    code: 422,
    data: { field: "email" },
  };

  const createResponse = (
    body: any,
    contentType = "application/json",
    status = 200
  ): Response =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": contentType },
    });

  it("devuelve datos si la respuesta es exitosa y en formato JSON", async () => {
    const res = createResponse({ name: "Café" });
    const data = await handleResponse<{ name: string }>(res);
    expect(data).toEqual({ name: "Café" });
  });

  it("lanza error si la respuesta es fallida con JSON", async () => {
    const res = createResponse(mockJson, "application/json", 422);

    await expect(handleResponse(res)).rejects.toEqual({
      status: 422,
      message: "Invalid request",
      code: 422,
      data: { field: "email" },
    });
  });

  it("lanza error genérico si no hay JSON", async () => {
    const res = new Response("Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });

    await expect(handleResponse(res)).rejects.toEqual({
      status: 500,
      message: "Request failed",
      code: 500,
      data: null,
    });
  });

  it("retorna null si el content-type no incluye application/json y la respuesta es ok", async () => {
    const res = new Response("", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });

    const data = await handleResponse(res);
    expect(data).toBeNull();
  });
});
