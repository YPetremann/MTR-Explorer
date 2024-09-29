import { Fragment } from "react/jsx-runtime";
import "./Line.scss";
import type { Station } from "../../definitions/worker";
import StationLink from "./StationLink";

export function Line({
  color,
  stations,
}: {
  color: string;
  stations: Station[];
}) {
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
