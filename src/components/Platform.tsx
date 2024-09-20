import { Icon } from "@iconify/react/dist/iconify.js";
import Lang from "./Lang";
import { Link } from "react-router-dom";

export function Platform({
  data,
  platform,
}: {
  data: Data;
  platform: Platform;
}) {
  return platform.routes.map((route, i) => (
    <div>
      <Link to={`/route/${route.id}`} key={i}>
        <Icon icon="mdi:train" style={{ color: route.color }} />
        <Lang text={route.line} />
        <span className="dim">
          {" "}
          - <Lang text={route.direction} />
        </span>
      </Link>
    </div>
  ));
}
