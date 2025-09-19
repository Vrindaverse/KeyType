import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["framer-motion"],
  },
  server: {
    port: 5173, // optional: dev server port
    proxy: {
      "/api": {
        target: "http://localhost:4000", // your Node backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
