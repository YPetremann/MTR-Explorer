import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useData } from "../contexts/data.ctx";
import { lang } from "../utils/lang";
import { Button } from "./Button";
import { Label } from "./Label";
import { SearchSelect } from "./SearchSelect";
import { Select } from "./Select";
const algos = [
  { value: "duration", label: "Prefer minimal duration" },
  { value: "distance", label: "Prefer minimal distance" },
  { value: "routes", label: "Prefer minimal routes" },
  { value: "uniform", label: "I don't care" },
];
export function TravelForm({
  route,
  algo,
  onSubmit,
}: {
  onSubmit: (from: string, dest: string) => void;
}) {
  const [points, setPoints] = useState(route);
  const [mode, setMode] = useState(algo ?? algos[0].value);
  const setPoint = (i, value) => setPoints(points.toSpliced(i, 1, value));
  const delPoint = i => setPoints(points.toSpliced(i, 1));
  const addPoint = i => setPoints(points.toSpliced(i, 0, ""));
  const invert = () => setPoints(points.toReversed());
  const submit = () => onSubmit(points, mode);
  const data = useData();
  const options = data.stations.map(station => {
    const infos: string[] = [];
    infos.push(`zone ${station.zone}`);
    if (station.platforms.length > 0) infos.push(`${station.platforms.length} platforms`);
    if (station.connections.length > 0) infos.push(`${station.connections.length} platforms`);
    return {
      value: station.id,
      label: lang(station.name),
      pattern: station.pattern,
    };
  });
  const last = points.length - 1;
  return (
    <div className="flex flex-row">
      <div className="flex grow flex-col gap-2">
        {points.map((point, i) => (
          <div className="row flex gap-2" key={i}>
            <div className="row flex grow">
              <Label>
                {i < last && (
                  <Icon
                    className="relative top-[0.165em] col-start-1 row-start-1 text-xl"
                    icon={`material-symbols:line-start-${i > 0 ? "circle" : "diamond"}`}
                    rotate="1"
                  />
                )}
                {i > 0 && (
                  <Icon
                    className="relative bottom-[0.165em] col-start-1 row-start-1 text-xl"
                    icon={`material-symbols:line-end-${i < last ? "circle" : "arrow"}`}
                    rotate="1"
                  />
                )}
              </Label>
              <SearchSelect
                className="flex shrink grow"
                onChange={({ value }) => setPoint(i, value)}
                options={options}
                value={options.find(({ value }) => value === point)}
              />
              {last > 1 && <Button icon="mdi:close" onClick={() => delPoint(i)} />}
            </div>
            <div className="relative top-1/2">
              <Button className="relative top-1" icon="mdi:plus" onClick={() => addPoint(i + 1)} />
            </div>
          </div>
        ))}
        <div className="row flex gap-2">
          <div className="row flex grow">
            <Label icon="mdi:gear" />
            <Select className="shrink grow" onChange={e => setMode(e.target.value)} value={mode}>
              {algos.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            <Button onClick={invert}>
              <Icon className="text-xl" icon="mdi:swap-vertical" />
            </Button>
          </div>
          <div className="invisible">
            <Button icon="mdi:plus" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button icon="mdi:search" onClick={submit} text="Find route" />
        </div>
      </div>
    </div>
  );
}
