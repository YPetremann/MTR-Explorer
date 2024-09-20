import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Lang from "./Lang";

export default function StationLink({ station }: { station: Station }) {
  return (
    <Link to={`/station/${station.index}`}>
      <Icon icon="mdi:town-hall" style={{ color: station.color }} />{" "}
      <Lang text={station.name} />
    </Link>
  );
}
