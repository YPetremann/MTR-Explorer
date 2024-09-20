import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import Column from "./Column";
import Row from "./Row";
import { SimpleSelect } from "react-selectize";
import { useData } from "../context/data.ctx";
import { lang } from "./Lang";

export function Form({
  route,
  onSubmit,
}: {
  onSubmit: (from: string, dest: string) => void;
}) {
  const [points, setPoints] = useState(route);
  const [mode, setMode] = useState("lines");
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
    return { value: station.id, label: lang(station.name) };
  });
  const last = points.length - 1;
  return (
    <Row>
      <Column className="grow">
        <Row>
          <Column className="grow">
            {points.map((point, i) => (
              <Row key={i}>
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
                  <SimpleSelect
                    options={options}
                    className="grow"
                    placeholder="Select a station"
                    theme="minimal"
                    value={options.find((o) => o.value === point)}
                    onValueChange={({ value }) => setPoint(i, value)}
                  ></SimpleSelect>
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
              </Row>
            ))}
          </Column>
        </Row>
        <Row>
          <label className="flex row middle grow">
            <Icon icon="mdi:tune-variant" />
            <select
              className="grow"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="lines">prefer minimal lines</option>
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
        </Row>
      </Column>
    </Row>
  );
}
