import { Icon, InlineIcon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useData } from "../contexts/data.ctx";
import SearchSelect from "./SearchSelect";
import { lang } from "../utils/lang";
import Label from "./Label";
import Button from "./Button";
import Select from "./Select";
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
    <div className="flex flex-row">
      <div className="flex flex-col grow gap-2">
        {points.map((point, i) => (
          <div className="flex row gap-2" key={i}>
            <div className="flex row grow">
              <Label>
                {i < last && (
                  <Icon
                    className="row-start-1 col-start-1 text-xl relative top-[0.165em]"
                    icon={
                      "material-symbols:line-start-" +
                      (i > 0 ? "circle" : "diamond")
                    }
                    rotate="1"
                  />
                )}
                {i > 0 && (
                  <Icon
                    className="row-start-1 col-start-1 text-xl relative bottom-[0.165em]"
                    icon={
                      "material-symbols:line-end-" +
                      (i < last ? "circle" : "arrow")
                    }
                    rotate="1"
                  />
                )}
              </Label>
              <SearchSelect
                className="flex grow shrink"
                options={options}
                value={options.find(({ value }) => value === point)}
                onChange={({ value }) => setPoint(i, value)}
              />
              {last > 1 && (
                <Button icon="mdi:close" onClick={() => delPoint(i)} />
              )}
            </div>
            <div className="relative top-1/2">
              <Button
                icon="mdi:plus"
                onClick={() => addPoint(i + 1)}
                className="relative top-1"
              />
            </div>
          </div>
        ))}
        <div className="flex row gap-2">
          <div className="flex row grow">
            <Label icon="mdi:gear" />
            <Select
              className="grow shrink"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
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
          <Button icon="mdi:search" text="Find route" onClick={submit} />
        </div>
      </div>
    </div>
  );
}
