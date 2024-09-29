import React from "react";
import { Data } from "../../definitions/worker";
import * as Comlink from "comlink";
import Progress from "../components/Progress";
import dataWorker from "../worker/data";

export const DataContext = React.createContext({});

export function useData(): Data {
  return React.useContext(DataContext);
}

export function usePathFinding() {
  return dataWorker.calcPath;
}

export function DataProvider({ children, source }) {
  const [loading, setLoading] = React.useState([0, "Loading"]);
  const [progress, message] = loading;
  const [data, setData] = React.useState<Data>({
    stations: [],
    routes: [],
    platforms: [],
    segments: [],
  });
  React.useEffect(() => {
    const t = setTimeout(() => {
      dataWorker
        .load(source, Comlink.proxy(setLoading))
        .then(() => dataWorker.getData())
        .then((data) => setData(data));
    }, 10);
    return () => clearTimeout(t);
  }, [source]);

  return (
    <DataContext.Provider value={data}>
      <Progress message={message} value={progress} size={[1, 1]} />
      {children}
    </DataContext.Provider>
  );
}
