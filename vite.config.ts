import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { comlink } from "vite-plugin-comlink";
import checker from "vite-plugin-checker";
import iconify from "@tomjs/vite-plugin-iconify";
import { VitePWA } from "vite-plugin-pwa";
import { minimal2023Preset as preset } from '@vite-pwa/assets-generator/config'
import inlineSource from "vite-plugin-inline-source";
import { ViteMinifyPlugin } from 'vite-plugin-minify'


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
      injectRegister: null,
      devOptions:{ enabled: true },
      workbox: { globPatterns: ["**/*"] },
      includeAssets: ["**/*"],
      pwaAssets:{
        preset,
        images: [ 'public/favicon.svg' ],
        overrideManifestIcons: true,
        includeHtmlHeadLinks: false,
        injectThemeColor:false,
      },
      manifest: {
        theme_color: "#831843",
        background_color: "#831843",
        display: "minimal-ui",
        scope: "/MTR-Explorer/",
        start_url: "/MTR-Explorer/",
        short_name: "MTR EX",
        description: "Explore the MTR network",
        name: "MTR Explorer",
      },
    }),
    inlineSource(),
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
