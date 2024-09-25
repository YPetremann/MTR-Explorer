import React from "react";
import YAML from "yaml";
import { useData, usePathFinding } from "../contexts/data.ctx";
import dataWorker from "../worker/data";
import { calcPath } from "../worker/data.worker";
import NetworkMap from "./NetworkMap";
import { lang } from "./Lang";
import StationLink from "./StationLink";
import RouteLink from "./RouteLink";
import DotStation from "./DotStation";

export default function Travel({ points, mode }) {
  const data = useData();
  const pathfind = usePathFinding();
  const [result, setResult] = React.useState(null);
  const [state, setState] = React.useState("prepare");

  function calcPath() {
    if (!data.stations.length) return;
    if (!mode && !points) return;
    if (points.filter((e) => e).length < 2) return;
    setResult();
    dataWorker.calcPath(points, mode).then(setResult);
  }

  React.useEffect(() => {
    calcPath();
  }, [data, points, mode]);

  if (!points || !mode) {
    return (
      <div>
        <h2>Fill</h2>
      </div>
    );
  }
  if (!result) {
    return (
      <div>
        <h2>Loading</h2>
        <NetworkMap />
      </div>
    );
  }
  return (
    <div>
      <h2>Result</h2>
      <pre>{YAML.stringify(data.platforms)}</pre>
      <pre>{YAML.stringify(result)}</pre>
      {/*
      <div>
        {result.map((sg, i) => {
          const routes = sg.routes
            .map((e) => data.routes[e] ?? { name: ["walk"] })
            .map((rt) => lang(rt.name) + " - " + lang(rt.direction));
          return (
            <div key={sg.index}>
              {i === 0 && <DotStation major index={sg.from} />}
              <div style={{ marginLeft: "20px" }}>
                {sg.routes.map((index) => (
                  <div key={index}>
                    <RouteLink index={index} />
                  </div>
                ))}
                <div>Stations: {sg.num_stations}</div>
              </div>
              <DotStation minor index={sg.to} />
              <DotStation index={sg.to} />
              <DotStation major index={sg.to} />
            </div>
          );
        })}
      </div>
          */}
    </div>
  );
}
