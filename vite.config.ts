import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { comlink } from "vite-plugin-comlink";
import eslint from "vite-plugin-eslint";
//import fileFormatter from "./tools/eslintFileFormatter";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/MTR-Helper/",
  plugins: [
    react(),
    eslint({
      fix: true,
      //formatter: fileFormatter,
    }),
    comlink(),
  ],
  worker: { plugins: () => [comlink()] },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
});
