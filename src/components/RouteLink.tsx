import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Lang from "./Lang";
import { useData } from "../contexts/data.ctx";

export default function RouteLink({
  route,
  index,
}: {
  route: Route;
  index: number;
}) {
  const data = useData();
  const rt = route ?? data.routes[index];
  if (index === -1)
    return (
      <div>
        <Icon icon="mdi:walk" color="black" /> Walk
      </div>
    );
  if (!rt) return;
  return (
    <Link className="break" to={`/route/${rt.index}`}>
      <Icon icon="mdi:train" color={rt.color} />{" "}
      {rt.number && (
        <span className="dim">
          <Lang text={rt.number} />{" "}
        </span>
      )}
      <Lang text={rt.name} />
      {rt.direction && (
        <span className="dim">
          {" "}
          - <Lang text={rt.direction} />
        </span>
      )}
    </Link>
  );
}
