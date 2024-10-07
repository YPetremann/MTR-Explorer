import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { comlink } from "vite-plugin-comlink";
import checker from "vite-plugin-checker";
import iconify from "@tomjs/vite-plugin-iconify";
import { VitePWA } from "vite-plugin-pwa";
import { minimal2023Preset as preset } from '@vite-pwa/assets-generator/config'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import mkcert from 'vite-plugin-mkcert'


// https://vitejs.dev/config/
export default defineConfig({
  base: "/MTR-Explorer/",
  server: { https: true, host: true },
  preview: { https: true, host: true },
  plugins: [
    mkcert(),
    react(),
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"', useFlatConfig: true },
      stylelint: { lintCommand: "stylelint ./src/**/*.{scss,css}" },
      biome: true,
    }),
    comlink(),
    VitePWA({
      registerType:"autoUpdate",
      devOptions:{ enabled: true },
      workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg}'] },
      includeAssets: ["**/*"],
      pwaAssets:{
        preset,
        images: [ 'public/favicon.svg' ],
        overrideManifestIcons: true,
        includeHtmlHeadLinks: false,
        injectThemeColor:false,
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
        "shortcuts" : [
          { "name": "Travel", "url": "/MTR-Explorer/travel" },
          { "name": "Routes", "url": "/MTR-Explorer/routes" },
          { "name": "Stations", "url": "/MTR-Explorer/stations" }
        ],
      },
    }),
    ViteMinifyPlugin(),
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
