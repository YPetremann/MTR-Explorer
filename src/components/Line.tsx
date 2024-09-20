import { Fragment } from "react/jsx-runtime";
import "./Line.scss";
import Lang from "./Lang";
import { Link } from "react-router-dom";
import type { Station } from "../api/worker";
import { useData } from "../context/data.ctx";
import StationLink from "./StationLink";

export function Line({
  color,
  stations,
}: {
  color: string;
  stations: Station[];
}) {
  const data = useData();
  const last = stations.length - 1;
  return (
    <div className="Line" style={{ "--color": color }}>
      {stations
        .map((id) => data.stations[id])
        .map((station, i) => (
          <Fragment key={i}>
            <Link to={`/station/${station.index}`} className="Line-station">
              <div className="Line-dot" />
              <div className="Line-name">
                <StationLink station={station} />
              </div>
            </Link>
            <div className={i === last ? "" : "Line-line grow"} />
          </Fragment>
        ))}
    </div>
  );
}
