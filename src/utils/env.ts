export const getEnvBaseUrl = (): string => {
  // Solo lo evalúa si estamos en Vite
  return typeof import.meta !== "undefined" &&
    import.meta.env?.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : "http://localhost:3000";
};
