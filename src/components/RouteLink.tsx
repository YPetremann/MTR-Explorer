import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Lang from "./Lang";

export default function RouteLink({ route }: { route: Route }) {
  return (
    <Link to={`/route/${route.index}`}>
      <Icon icon="mdi:train" color={route.color} />{" "}
      <span className="dim">
        <Lang text={route.number} />
      </span>{" "}
      <Lang text={route.name} />
      <span className="dim">
        {" "}
        - <Lang text={route.direction} />
      </span>
    </Link>
  );
}
