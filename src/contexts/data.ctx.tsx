import * as Comlink from "comlink";
import React from "react";
import type { Data } from "../../definitions/worker";
import Progress from "../components/Progress";
import dataWorker from "../worker/data";
import useProfile from "./profile.ctx";

export const DataContext = React.createContext({});

export function useData(): Data {
  const { data } = React.useContext(DataContext);
  return data;
}
export function useLock() {
  const { setLock } = React.useContext(DataContext);
  React.useEffect(() => {
    setLock(true);
    return () => setLock(false);
  }, [setLock]);
}

export function usePathFinding() {
  return dataWorker.calcPath;
}

export function DataProvider({ children }) {
  const [lock, setLock] = React.useState(false);
  const [loading, setLoading] = React.useState([0, "Loading"]);
  const [progress, message] = loading;

  const profile = useProfile();
  const source = profile.current?.systemMap?.dataUrl;

  const [data, setData] = React.useState<Data>({
    stations: [],
    routes: [],
    platforms: [],
    segments: [],
  });

  React.useEffect(() => {
    const t = setTimeout(() => {
      if (lock) return;
      console.log("loading data");
      dataWorker
        .load(source, Comlink.proxy(setLoading))
        .then(() => dataWorker.getData())
        .then(data => setData(data));
    }, 10);
    return () => clearTimeout(t);
  }, [source, lock]);

  return (
    <DataContext.Provider value={{ data, setLock }}>
      <Progress message={message} size={[1, 1]} value={progress} />
      {children}
    </DataContext.Provider>
  );
}
