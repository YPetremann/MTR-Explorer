import { InlineIcon } from "@iconify/react/dist/iconify.js";
import { Line } from "./Line";
import Lang from "./Lang";
import { useData } from "../contexts/data.ctx";

export default function RouteDetail({ route }: { route: Route }) {
  const data = useData();

  return (
    <section>
      <div className="double">
        <InlineIcon icon="mdi:train" color={route.color} />
        <span className="dim">
          <Lang text={route.number} />
        </span>{" "}
        <Lang text={route.name} />{" "}
        <span className="dim">
          <Lang text={route.direction} />
        </span>
      </div>
      <Line color={route.color} stations={route.stations} />
    </section>
  );
}
