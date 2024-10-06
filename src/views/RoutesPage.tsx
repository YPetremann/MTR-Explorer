import React from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Main from "../components/Main";
import RouteLink from "../components/RouteLink";
import { useData } from "../contexts/data.ctx";

export default function RoutesPage() {
  const [filter, setFilter] = React.useState("");
  const lf = filter.toLowerCase();
  const data = useData();
  return (
    <>
      <Header name="Routes">
        <label>
          <Input onChange={ev => setFilter(ev.target.value)} placeholder="Filter routes" type="search" value={filter} />
        </label>
      </Header>
      <Main>
        <div className="flex flex-col items-start gap-1">
          {data.routes
            .filter(route => route.pattern.includes(lf))
            .map(route => (
              <RouteLink key={route.index} route={route} />
            ))}
        </div>
      </Main>
    </>
  );
}
