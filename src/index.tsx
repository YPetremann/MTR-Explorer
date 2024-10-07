import { enableCache } from "@iconify/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { StationList } from "./components/StationList.tsx";
import { ConfigProvider } from "./contexts/config.ctx.tsx";
import { DataProvider } from "./contexts/data.ctx.tsx";

import { registerSW } from "virtual:pwa-register";
import { Router } from "./Router.tsx";
import { Stats } from "./components/Stats.tsx";

registerSW({ immediate: true });
enableCache("session");
const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found");
createRoot(rootEl).render(
  <StrictMode>
    <ConfigProvider>
      <DataProvider>
        <StationList />
        <Router />
        {import.meta.env.DEV && <Stats />}
      </DataProvider>
    </ConfigProvider>
  </StrictMode>,
);
