import { Icon } from "@iconify/react/dist/iconify.js";
import { useData } from "../context/data.ctx";
import { lang } from "./Lang";

export function StationList() {
  const data = useData();
  return (
    <datalist id="stations">
      {data.stations.map((station) => {
        const infos = [];
        infos.push(`zone ${station.zone}`);
        if (station.platforms.length > 0)
          infos.push(`${station.platforms.length} platforms`);
        if (station.connections.length > 0)
          infos.push(`${station.connections.length} platforms`);
        return (
          <option key={station.index} value={lang(station.name)}>
            {infos.join(" - ")}
          </option>
        );
      })}
    </datalist>
  );
}
