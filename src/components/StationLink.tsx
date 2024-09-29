import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useData } from "../contexts/data.ctx";
import { lang } from "../utils/lang";

interface StationLinkProps {
  station: Station;
  index: number;
}

function useDataStation(index: number) {
  const data = useData();
  const st = data.stations[index];
  return st;
}

export default function StationLink({ station, index }: StationLinkProps) {
  const st = useDataStation(station?.index ?? index);
  if (!st) return;
  return (
    <Link
      className="inline-flex row gap-1 items-baseline text-blue-800"
      to={`/station/${st.index}`}
    >
      <Icon icon="mdi:town-hall" style={{ color: st.color }} />
      <span className="break-words">{lang(st.name)}</span>
    </Link>
  );
}
