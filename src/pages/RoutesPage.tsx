import React from "react";
import { useData } from "../context/data.ctx";
import { Route } from "../components/RouteDetail";
import { Icon, InlineIcon } from "@iconify/react/dist/iconify.js";
import Lang from "../components/Lang";
import { Link } from "react-router-dom";
import RouteLink from "../components/RouteLink";

export default function RoutesPage() {
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
        {data.routes
          .filter((route) => route.pattern.includes(filter))
          .map((route: any, i: number) => (
            <div key={i}>
              <RouteLink route={route} />
            </div>
          ))}
      </div>
    </>
  );
}
