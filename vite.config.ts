import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Puerto interno (no se expone públicamente)
    host: true, // permite acceso desde otros contenedores o la red local
  },
  preview: {
    port: 3000,
    host: true,
  },
});
