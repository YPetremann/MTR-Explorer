import { Icon } from "@iconify/react/dist/iconify.js";
import { useData } from "../context/data.ctx";
import Lang from "./Lang";
import RouteLink from "./RouteLink";
import StationLink from "./StationLink";

export default function StationDetail({ station }: { station: Station }) {
  const data = useData();

  return (
    <section>
      <div className="flex row middle double">
        <Icon icon="mdi:town-hall" color={station.color} />
        <div>
          <Lang text={station.name} />
        </div>
      </div>
      <div style={{ height: "6px", background: station.color }}></div>
      <div className="flex column">
        {station.connections
          .map((id) => data.stations[id])
          .filter((station) => station)
          .map((station, i) => (
            <StationLink station={station} key={i} />
          ))}
      </div>

      <div className="flex column">
        {station.routes
          .map((id) => data.routes[id])
          .map((route, i) => (
            <RouteLink key={i} route={route} />
          ))}
      </div>
    </section>
  );
}
