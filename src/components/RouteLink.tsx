import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { useData } from "../contexts/data.ctx";
import { contrast } from "../utils/contrast";
import { lang } from "../utils/lang";
import type { Route } from "../../definitions/worker";

interface RouteLinkProps {
  route: Route;
  index: number;
}

const Icons = {
  walk: "mdi:walk",
  wait: "mdi:clock-outline",
  airplane_normal: "mdi:plane",
  train_light_rail: "mdi:tram",
  train_normal: "mdi:train",
  train_high_speed: "mdi:train",
  boat_normal: "mdi:sail-boat",
  boat_high_speed: "mdi:snowmobile",
  boat_light_rail: "mdi:ferry",
  cable_car_normal: "mdi:cable-car",
  default: "mdi:map-marker-path",
};
function getRouteIcon(type) {
  return Icons[type] ?? Icons.default;
}

function useDataRoute(index) {
  const data = useData();
  const route =
    index === -1
      ? { name: "Walk", color: "white", type: "walk" }
      : index === -2
        ? { name: "Wait", color: "white", type: "wait" }
        : data.routes[index];
  if (!route) return;

  return {
    ...route,
    icon: getRouteIcon(route.type),
    colorFg: index < 0 ? "black" : contrast(route.color),
    colorBg: index < 0 ? "white" : route.color,
    last: data.stations[route.stations?.at(-1)],
  };
}

export function RouteLink({ route, index }: RouteLinkProps) {
  const rt = useDataRoute(route?.index ?? index);
  if (!rt) return;
  return (
    <Link className="inline-flex flex-wrap items-baseline gap-x-1 break-words" to={`/route/${rt.index}`}>
      <div
        className="inline-flex items-center gap-1 whitespace-nowrap px-1"
        style={{ background: rt.colorBg, color: rt.colorFg }}
      >
        <Icon icon={rt.icon} />
        {lang(rt.name)}
      </div>
      {rt.number && <span className="break-words">{lang(rt.number)}</span>}
      {rt.last && <span className="break-words">{`to ${lang(rt.last?.name)}`}</span>}
    </Link>
  );
}
