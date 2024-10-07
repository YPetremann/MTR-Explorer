import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { comlink } from "vite-plugin-comlink";
import iconify from "@tomjs/vite-plugin-iconify";
import { VitePWA } from "vite-plugin-pwa";
import { minimal2023Preset as preset } from "@vite-pwa/assets-generator/config";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import fs from "fs";
// https://vitejs.dev/config/
export default defineConfig(async ({ mode, command,...args }) => {
  const isDev=mode==="development"
  const isProd=mode==="production"
  return {
    base: "/MTR-Explorer/",
    server: { host: true },
    preview: { 
      https:isDev &&{
        cert: fs.readFileSync("certs/cert.pem"),
        key: fs.readFileSync("certs/dev.pem"),
      }, 
      host: true
    },
    plugins: [
      react(),
      comlink(),
      iconify({
        local: { sets: ["mdi", "material-symbols", "ri"], path: "iconify@{version}", copy: true },
      }),
      VitePWA({
        registerType: "autoUpdate",
        workbox: { globPatterns: ["**/*.{js,css,html,ico,png,svg}"] },
        includeAssets: ["**/*"],
        pwaAssets: {
          preset,
          images: ["public/favicon.svg"],
          overrideManifestIcons: true,
          includeHtmlHeadLinks: false,
          injectThemeColor: false,
        },
        manifest: {
          theme_color: "#b42249",
          background_color: "#b42249",
          display: "standalone",
          scope: "/MTR-Explorer/",
          start_url: "/MTR-Explorer/",
          short_name: "MTR EX",
          description: "Explore the MTR network",
          name: "MTR Explorer",
          shortcuts: [
            { name: "Travel", url: "/MTR-Explorer/travel" },
            { name: "Routes", url: "/MTR-Explorer/routes" },
            { name: "Stations", url: "/MTR-Explorer/stations" },
          ],
        },
      }),
      ViteMinifyPlugin({}),
      isDev && [
        (await import("vite-plugin-mkcert")).default({
          savePath: './certs',
          autoUpgrade: true,
          hosts: ['localhost'],
          force: true,
        }),
        (await import("vite-plugin-checker")).default({
          typescript: true,
          eslint: { lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"', useFlatConfig: true },
          stylelint: { lintCommand: "stylelint ./src/**/*.{scss,css}" },
          biome: true,
          overlay:{ initialIsOpen: "error" },
          terminal:false,
        }),
      ]
    ],
    worker: { plugins: () => [comlink()] },
    css: { preprocessorOptions: { scss: { silenceDeprecations: ["legacy-js-api"] } } },
  };
});
