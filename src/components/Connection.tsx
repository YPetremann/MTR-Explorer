import { Icon } from "@iconify/react/dist/iconify.js";
import type { Data, Station } from "../api/data";
import Lang from "./Lang";
import { Link } from "react-router-dom";

export function Connection({ connection }: { connection: Station }) {
  return (
    <Link to={`/station/${connection.id}`} className="flex row middle">
      <Icon icon="mdi:town-hall" style={{ color: connection.color }} />
      <Lang text={connection.lang} />
    </Link>
  );
}
