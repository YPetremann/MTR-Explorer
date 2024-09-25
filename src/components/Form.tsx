import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { SimpleSelect } from "react-selectize";
import { useData } from "../contexts/data.ctx";
import { lang } from "./Lang";
import SearchSelect from "./SearchSelect";
export function Form({
  route,
  onSubmit,
}: {
  onSubmit: (from: string, dest: string) => void;
}) {
  const [points, setPoints] = useState(route);
  const [mode, setMode] = useState("distance");

  const setPoint = (i, value) => setPoints(points.toSpliced(i, 1, value));
  const delPoint = (i) => setPoints(points.toSpliced(i, 1));
  const addPoint = (i) => setPoints(points.toSpliced(i, 0, ""));
  const swapPoint = (i, j) =>
    setPoints(points.toSpliced(i, 1, points[j]).toSpliced(j, 1, points[i]));
  const invert = () => setPoints(points.toReversed());
  const submit = () => onSubmit(points, mode);
  const data = useData();
  const options = data.stations.map((station) => {
    const infos = [];
    infos.push(`zone ${station.zone}`);
    if (station.platforms.length > 0)
      infos.push(`${station.platforms.length} platforms`);
    if (station.connections.length > 0)
      infos.push(`${station.connections.length} platforms`);
    return {
      value: station.id,
      label: lang(station.name),
      pattern: station.pattern,
    };
  });
  const last = points.length - 1;
  return (
    <div className="flex row">
      <div className="flex column grow">
        <div className="flex row">
          <div className="flex column grow">
            {points.map((point, i) => (
              <div className="flex row" key={i}>
                <label className="flex row middle grow">
                  <Icon
                    icon={
                      i === 0
                        ? "mdi:ray-start"
                        : i === last
                        ? "mdi:ray-end"
                        : "mdi:ray-vertex"
                    }
                    rotate="1"
                  />
                  <SearchSelect
                    className="grow"
                    options={options}
                    value={options.find(({ value }) => value === point)}
                    onChange={({ value }) => setPoint(i, value)}
                  />
                </label>
                <button
                  className={i === 0 ? "invisible" : ""}
                  onClick={() => swapPoint(i, i - 1)}
                >
                  <Icon icon="mdi:menu-up" />
                </button>
                <button
                  className={i === last ? "invisible" : ""}
                  onClick={() => swapPoint(i, i + 1)}
                >
                  <Icon icon="mdi:menu-down" />
                </button>
                {last > 1 && (
                  <button onClick={() => delPoint(i)}>
                    <Icon icon="mdi:close" />
                  </button>
                )}
                {
                  <button
                    className={i > 0 ? "shift" : "invisible"}
                    onClick={() => addPoint(i)}
                  >
                    <Icon icon="mdi:plus" />
                  </button>
                }
              </div>
            ))}
          </div>
        </div>
        <div className="flex row">
          <label className="flex row middle grow">
            <Icon icon="mdi:tune-variant" />
            <select
              className="grow"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="routes">prefer minimal routes</option>
              <option value="distance">prefer minimal distance</option>
              <option value="duration">prefer minimal duration</option>
            </select>
          </label>
          <button onClick={invert}>
            <Icon icon="mdi:swap-vertical" />
          </button>
          <button onClick={submit}>
            <Icon icon="mdi:search" />
          </button>
        </div>
      </div>
    </div>
  );
}
