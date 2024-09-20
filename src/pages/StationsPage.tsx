import React from "react";
import { useData } from "../context/data.ctx";
import { Station } from "../components/StationDetail";
import { Icon, InlineIcon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import Lang from "../components/Lang";
import StationLink from "../components/StationLink";

export default function StationsPage() {
  const [filter, setFilter] = React.useState("");
  const data = useData();

  return (
    <>
      <div>
        <label>
          filter:{" "}
          <input
            type="search"
            value={filter}
            onChange={(ev) => setFilter(ev.target.value)}
          />
        </label>
      </div>
      <div className="columns">
        {data.stations
          .filter((station) => station.pattern.includes(filter))
          .map((station: any, i: number) => (
            <div key={i}>
              <StationLink station={station} />
            </div>
          ))}
      </div>
    </>
  );
}
