import { Icon, InlineIcon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useData } from "../contexts/data.ctx";
import SearchSelect from "./SearchSelect";
import { lang } from "../utils/lang";
const algos = [
  { value: "duration", label: "Prefer minimal duration" },
  { value: "distance", label: "Prefer minimal distance" },
  { value: "routes", label: "Prefer minimal routes" },
  { value: "uniform", label: "I don't care" },
];
export function Form({
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
      <div className="flex flex-col grow">
        <div className="flex flex-row">
          <div className="flex flex-col grow gap-2">
            {points.map((point, i) => (
              <div className="flex row" key={i}>
                {
                  <div
                    className="relative top-1/2"
                    onClick={() => addPoint(i + 1)}
                  >
                    <button className="border border-gray-400 bg-slate-300 hover:bg-slate-100 border-solid m-2 p-1 rounded-md flex items-center relative top-1">
                      <Icon icon="mdi:plus" />
                    </button>
                  </div>
                }
                <button className="border border-r-0 border-gray-400 border-solid px-3 rounded-l-md grid items-center">
                  {i === 0 && (
                    <Icon
                      className="text-xl"
                      icon="material-symbols:line-start-diamond"
                      rotate="1"
                    />
                  )}
                  {i > 0 && i < last && (
                    <>
                      <Icon
                        className="row-start-1 col-start-1 relative top-[0.165em]  text-xl"
                        icon="material-symbols:line-start-circle"
                        rotate="1"
                      />
                      <Icon
                        className="row-start-1 col-start-1 relative bottom-[0.165em] text-xl"
                        icon="material-symbols:line-end-circle"
                        rotate="1"
                      />
                    </>
                  )}
                  {i === last && (
                    <Icon
                      className="text-xl"
                      icon="material-symbols:line-end-arrow"
                      rotate="1"
                    />
                  )}
                </button>
                <SearchSelect
                  className={"flex grow shrink"}
                  options={options}
                  value={options.find(({ value }) => value === point)}
                  onChange={({ value }) => setPoint(i, value)}
                />
                <button
                  className="hidden border border-l-0 bg-slate-300 hover:bg-slate-100 border-gray-900 border-solid px-3"
                  disabled={i === 0}
                  onClick={() => swapPoint(i, i - 1)}
                >
                  <Icon className="text-xl" icon="mdi:menu-up" />
                </button>
                <button
                  className="hidden border border-l-0 bg-slate-300 hover:bg-slate-100 border-gray-900 border-solid px-3"
                  disabled={i === last}
                  onClick={() => swapPoint(i, i + 1)}
                >
                  <Icon className="text-xl" icon="mdi:menu-down" />
                </button>
                {last > 1 && (
                  <button
                    className="border border-l-0 bg-slate-300 hover:bg-slate-100 border-gray-900 border-solid px-3 rounded-r-md"
                    onClick={() => delPoint(i)}
                  >
                    <Icon className="text-xl" icon="mdi:close" />
                  </button>
                )}
              </div>
            ))}
            <div className="flex row">
              <label className="flex row middle grow">
                {
                  <button className="border px-3 invisible">
                    <Icon icon="mdi:plus" />
                  </button>
                }

                <button className="border border-r-0 border-gray-400 border-solid px-3 rounded-l-md flex items-center">
                  <Icon className="text-xl" icon="mdi:gear" />
                </button>
                <select
                  className="border border-gray-900 border-solid px-3 grow shrink"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                >
                  {algos.map(({ value, label }) => (
                    <option key={label} value={label}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
              <button
                className="border border-l-0 bg-slate-300 hover:bg-slate-100 border-gray-900 border-solid px-3"
                onClick={invert}
              >
                <Icon className="text-xl" icon="mdi:swap-vertical" />
              </button>
            </div>
            <div className="flex justify-end">
              <button
                className="inline-flex items-center gap-2 border bg-slate-300 hover:bg-slate-100 border-gray-900 border-solid p-2 rounded-md"
                onClick={submit}
              >
                <InlineIcon className="text-xl" icon="mdi:search" />
                <span>Find route</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
