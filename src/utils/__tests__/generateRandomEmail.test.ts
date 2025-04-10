import { generateRandomEmail } from "../generateRandomEmail";

describe("generateRandomEmail", () => {
  const domains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "protonmail.com",
  ];

  it("debería retornar un string con formato de correo", () => {
    const email = generateRandomEmail();
    expect(typeof email).toBe("string");
    expect(email).toContain("@");

    const [name, domain] = email.split("@");
    expect(name.length).toBe(10); // default
    expect(domains).toContain(domain);
  });

  it("debería generar correos con longitud de nombre personalizada", () => {
    const email = generateRandomEmail(15);
    const [name] = email.split("@");
    expect(name.length).toBe(15);
  });

  it("debería generar diferentes correos en múltiples llamadas", () => {
    const emails = new Set(
      Array.from({ length: 10 }, () => generateRandomEmail())
    );
    expect(emails.size).toBeGreaterThan(1); // al menos 2 únicos
  });
});
