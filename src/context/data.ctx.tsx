import React from "react";
import processData, { Data } from "../api/data";
import * as Comlink from "comlink";
import { StationList } from "../components/StationList";
export const DataContext = React.createContext({});

const dataWorker = new ComlinkWorker<typeof import("../worker/data")>(
  new URL("../worker/data", import.meta.url)
);

export function useData(key: string, def: any): Data {
  return React.useContext(DataContext);
}

const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

import Progress from "../components/Progress";

export function DataProvider({ children, source }) {
  const [loading, setLoading] = React.useState([0, "Loading"]);
  const [progress, message] = loading;
  const [data, setData] = React.useState<any>({
    stations: [],
    routes: [],
    platforms: [],
    segments: [],
  });
  React.useEffect(() => {
    dataWorker
      .load(source, Comlink.proxy(setLoading))
      .then(() => dataWorker.getData())
      .then((data) => setData(data));
  }, []);

  return (
    <DataContext.Provider value={data}>
      <Progress message={message} value={progress} size={[1, 10]} />
      {children}
    </DataContext.Provider>
  );
}
