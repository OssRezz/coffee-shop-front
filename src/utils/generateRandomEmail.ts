export const generateRandomEmail = (length: number = 10): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const domains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "protonmail.com",
  ];
  const name = Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${name}@${domain}`;
};
