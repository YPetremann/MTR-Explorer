import React from "react";
import { useData } from "../contexts/data.ctx";
import RouteLink from "../components/RouteLink";
import Main from "../components/Main";
import Header from "../components/Header";
import Input from "../components/Input";

export default function RoutesPage() {
  const [filter, setFilter] = React.useState("");
  const lf = filter.toLowerCase();
  const data = useData();
  return (
    <>
      <Header name="Routes">
        <label>
          <Input
            type="search"
            placeholder="Filter routes"
            value={filter}
            onChange={(ev) => setFilter(ev.target.value)}
          />
        </label>
      </Header>
      <Main>
        <div className="flex flex-col items-start gap-1">
          {data.routes
            .filter((route) => route.pattern.includes(lf))
            .map((route) => (
              <RouteLink key={route.index} route={route} />
            ))}
        </div>
      </Main>
    </>
  );
}
