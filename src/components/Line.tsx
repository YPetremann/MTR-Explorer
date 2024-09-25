import { Fragment } from "react/jsx-runtime";
import "./Line.scss";
import Lang from "./Lang";
import { Link } from "react-router-dom";
import type { Station } from "../../definitions/worker";
import { useData } from "../contexts/data.ctx";
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
      {stations.map((index) => (
        <Fragment key={index}>
          <div className="Line-station">
            <div className="Line-dot" />
            <div className="Line-name">
              <StationLink index={index} />
            </div>
          </div>
          <div className="Line-line grow" />
        </Fragment>
      ))}
    </div>
  );
}
