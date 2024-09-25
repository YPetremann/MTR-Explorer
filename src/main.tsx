import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { enableCache } from "@iconify/react";
import "react-selectize/themes/index.css";

import { DataProvider } from "./contexts/data.ctx.tsx";
import App from "./App.tsx";
import "./index.scss";
import Stats from "./components/Stats.tsx";
enableCache("session");
/*
const source = "https://letsplay.minecrafttransitrailway.com/system-map/data";
/*/
const source = new URL("/data.min.json", document.location).href;
//*/
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Stats />
    <DataProvider source={source}>
      <App />
    </DataProvider>
  </StrictMode>
);
