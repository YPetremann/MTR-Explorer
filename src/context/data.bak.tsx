import React from "react";
import processData, { Data } from "../api/data";
import { StationList } from "../components/StationList";
export const DataContext = React.createContext({});

export function useData(key: string, def: any): Data {
  return React.useContext(DataContext);
}
const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

import Progress from "../components/Progress";

export function DataProvider({ children, source }) {
  const [loading, setLoading] = React.useState([0, "Loading"]);
  const [progress, message] = loading;
  const [data, setData] = React.useState<any>(null);
  React.useEffect(() => {
    (async () => {
      setLoading([1, "Fetching data..."]);
      const res = await fetch(source);
      setLoading([2, "Parsing data..."]);
      const body = await res.json();
      setLoading([3, "Processing data..."]);
      await timeout(1);
      const data = await processData(body);
      setLoading([4, "Rendering..."]);
      await timeout(1);
      setData(data);
    })();
  }, []);
  return (
    <DataContext.Provider value={data}>
      {!data ? (
        <div className="flex column">
          <div>{message}</div>
          <Progress mode="dots" value={progress} max="4" />
        </div>
      ) : (
        children
      )}
    </DataContext.Provider>
  );
}
