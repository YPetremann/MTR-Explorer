import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { enableCache } from "@iconify/react";

import { ConfigProvider } from "./contexts/config.ctx.tsx";
import { DataProvider } from "./contexts/data.ctx.tsx";
import { StationList } from "./components/StationList.tsx";

import Router from "./Router.tsx";
import Stats from "./components/Stats.tsx";

enableCache("session");
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider>
      <DataProvider>
        <StationList />
        <Router />
        {import.meta.env.DEV && <Stats />}
      </DataProvider>
    </ConfigProvider>
  </StrictMode>
);