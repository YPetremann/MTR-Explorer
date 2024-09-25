import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Lang from "./Lang";
import { useData } from "../contexts/data.ctx";

export default function StationLink({
  station,
  index,
}: {
  station: Station;
  index: number;
}) {
  const data = useData();
  const st = station ?? data.stations[index];
  if (!st) return;
  return (
    <Link className="break" to={`/station/${st.index}`}>
      <Icon icon="mdi:town-hall" style={{ color: st.color }} />{" "}
      <Lang text={st.name} />
    </Link>
  );
}
