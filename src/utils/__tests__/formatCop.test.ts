import { formatCOP } from "../formatCOP";

describe("formatCOP", () => {
  it("formatea un número positivo a COP correctamente", () => {
    expect(formatCOP(15000).replace(/\u00a0/g, " ")).toBe("$ 15.000");
  });

  it("formatea cero correctamente", () => {
    expect(formatCOP(0).replace(/\u00a0/g, " ")).toBe("$ 0");
  });

  it("formatea números grandes correctamente", () => {
    expect(formatCOP(123456789).replace(/\u00a0/g, " ")).toBe("$ 123.456.789");
  });

  it("formatea números negativos correctamente", () => {
    expect(formatCOP(-1200).replace(/\u00a0/g, " ")).toBe("-$ 1.200");
  });
});
