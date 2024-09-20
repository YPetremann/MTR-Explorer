import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { enableCache } from "@iconify/react";
import "react-selectize/themes/index.css";

import { DataProvider } from "./context/data.ctx.tsx";
import App from "./App.tsx";
import "./index.scss";
import "./stats";
enableCache("session");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataProvider source="/data.min.json">
      <App />
    </DataProvider>
  </StrictMode>
);
