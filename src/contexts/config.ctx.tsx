import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import type { Data } from "../../definitions/worker";
import useTheme from "../hooks/useTheme";

const defaultProfile = {
  currentProfile: "LPS server",
  profiles: {
    "LPS server": {
      systemMap: {
        dataUrl: "https://letsplay.minecrafttransitrailway.com/system-map/data",
      },
    },
    "Local Example": {
      systemMap: {
        dataUrl: new URL("/MTR-Helper/data.json", document.location).href,
      },
    },
  },
};

export const ConfigContext = React.createContext(defaultProfile);

export function useConfig(): Data {
  return React.useContext(ConfigContext);
}

export function ConfigProvider({ children }) {
  const [config, setConfig] = useLocalStorage("config", defaultProfile);
  useTheme(config.theme);

  return <ConfigContext.Provider value={[config, setConfig]}>{children}</ConfigContext.Provider>;
}
