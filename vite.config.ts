import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { comlink } from "vite-plugin-comlink";
import checker from "vite-plugin-checker";
import iconify from "@tomjs/vite-plugin-iconify";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/MTR-Explorer/",
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"', useFlatConfig: true },
      stylelint: { lintCommand: "stylelint ./src/**/*.{scss,css}" },
      biome: true,
    }),
    comlink(),
    VitePWA({
      workbox: { globPatterns: ["**/*"] },
      includeAssets: ["**/*"],
      manifest: {
        theme_color: "#831843",
        background_color: "#831843",
        display: "standalone",
        scope: "/",
        start_url: "/",
        short_name: "vite test",
        description: "testing vite pwa",
        name: "vite test",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    iconify({
      local: {
        sets: ["mdi", "material-symbols"],
        path: "iconify@{version}",
        copy: true,
      },
    }),
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
