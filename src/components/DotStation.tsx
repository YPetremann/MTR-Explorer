import StationLink from "./StationLink";
import "./DotStation.scss";
export default function DotStation({ index, minor, major }) {
  return (
    <div className={"DS" + (major ? " DS--major" : minor ? " DS--minor" : "")}>
      <div className="DS__dot" />
      <StationLink index={index} />
    </div>
  );
}
