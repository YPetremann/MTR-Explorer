import React from "react";
import { useData } from "../contexts/data.ctx";
import dataWorker from "../worker/data";
import DotStation from "./DotStation";
import RouteLink from "./RouteLink";
import Time from "./Time";
import "./Travel.scss";

/** Get the ordinal version for a number
 * @param {number} n
 * @returns {string}
 * @example
 * ordinal(1) // "1st"
 * ordinal(2) // "2nd"
 * ordinal(3) // "3rd"
 * ordinal(4) // "4th"
 * ordinal(11) // "11th"
 * ordinal(12) // "12th"
 * ordinal(13) // "13th"
 * ordinal(21) // "21st"
 * ordinal(22) // "22nd"
 * ordinal(23) // "23rd"
 * ordinal(24) // "24th"
 * ordinal(101) // "101st"
 */
function ordinal(n) {
  if (n % 100 > 10 && n % 100 < 14) return n + "th";
  if (n % 10 === 1) return n + "st";
  if (n % 10 === 2) return n + "nd";
  if (n % 10 === 3) return n + "rd";
  return n + "th";
}

export default function Travel({ points, algo }) {
  const data = useData();
  const [result, setResult] = React.useState(null);
  const [advanced, setAdvanced] = React.useState(false);

  React.useEffect(() => {
    function calcPath() {
      if (!data.stations.length) return;
      if (!algo && !points) return;
      if (points.filter(e => e).length < 2) return;
      setResult();
      dataWorker.calcPath(points, algo).then(setResult);
    }

    calcPath();
  }, [data, points, algo]);

  if (!result) return;
  return (
    <div>
      <label>
        <input checked={advanced} onChange={() => setAdvanced(e => !e)} type="checkbox" /> Show details
      </label>
      <div>
        {result.map((part, i) => (
          <div key={i} style={{ margin: "20px 0" }}>
            {part.map((seg, j) => {
              const prev = part[j - 1];
              const route = data.routes[seg.route.index];
              return (
                <div key={j}>
                  {j === 0 && <DotStation index={seg.from.index} major={true} />}
                  {j > 0 &&
                    (advanced || j < part.length - 1) &&
                    seg.route.index !== -2 &&
                    seg.from.index !== prev.from.index && <DotStation index={data.platforms[seg.from.index].station} />}

                  {(advanced || seg.route.index >= 0) && (
                    <div className={`Line Line--${seg.route.type}`} style={{ "--color": route?.color }}>
                      <RouteLink index={seg.route.index} /> {advanced && <Time ticks={seg.duration} />}
                      {advanced && !!seg.station && (
                        <>
                          <br />
                          {ordinal(seg.station)} station
                        </>
                      )}
                    </div>
                  )}
                  {j === part.length - 1 && <DotStation index={seg.to.index} major={true} />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
