import { mapApiErrors } from "../mapApiErrors";

describe("mapApiErrors", () => {
  it("incluye el mensaje principal si está presente", () => {
    const error = {
      success: false,
      code: 400,
      message: "Error general",
      data: [],
    } as const;

    const result = mapApiErrors(error);
    expect(result).toContain("Error general");
  });

  it("mapea mensajes desde data.messages", () => {
    const error = {
      success: false,
      code: 422,
      message: "Validación fallida",
      data: [
        {
          messages: {
            name: ["Name is required"],
            email: ["Email is invalid"],
          },
        },
      ],
    } as const;

    const result = mapApiErrors(error);
    expect(result).toEqual([
      "Validación fallida",
      "Name is required",
      "Email is invalid",
    ]);
  });

  it("agrega mensaje por campo inválido si no hay messages", () => {
    const error = {
      success: false,
      code: 422,
      message: "Datos inválidos",
      data: [
        {
          field: "password",
        },
      ],
    } as const;

    const result = mapApiErrors(error);
    expect(result).toEqual(["Datos inválidos", "Invalid field: password"]);
  });

  it("retorna mensaje genérico si no hay mensajes", () => {
    const error = {
      success: false,
      code: 500,
      message: "",
      data: [],
    } as const;

    const result = mapApiErrors(error);
    expect(result).toEqual(["Ocurrió un error inesperado."]);
  });

  it("retorna mensaje genérico si data no es array", () => {
    const error = {
      success: false,
      code: 500,
      message: "",
      data: { foo: "bar" },
    } as const;

    const result = mapApiErrors(error);
    expect(result).toEqual(["Ocurrió un error inesperado."]);
  });
});
