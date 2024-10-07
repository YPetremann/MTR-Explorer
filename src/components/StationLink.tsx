import { Link } from "react-router-dom";
import type { Station } from "../../definitions/worker";
import { useData } from "../contexts/data.ctx";
import { lang } from "../utils/lang";
import { Icon } from "./Icon";

interface StationLinkProps {
  station: Station;
  index: number;
}

function useDataStation(index: number) {
  const data = useData();
  const st = data.stations[index];
  return st;
}

export function StationLink({ station, index }: StationLinkProps) {
  const st = useDataStation(station?.index ?? index);
  if (!st) return;
  return (
    <Link className="row inline-flex items-baseline gap-1 text-link-700" to={`/station/${st.index}`}>
      <Icon icon="mdi:town-hall" style={{ color: st.color }} />
      <span className="break-words">{lang(st.name)}</span>
    </Link>
  );
}
