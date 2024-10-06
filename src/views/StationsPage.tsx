import React from "react";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Main } from "../components/Main";
import { StationLink } from "../components/StationLink";
import { useData } from "../contexts/data.ctx";

export function StationsPage() {
  const [filter, setFilter] = React.useState("");
  const data = useData();
  const lf = filter.toLowerCase();

  return (
    <>
      <Header name="Stations">
        <Input onChange={ev => setFilter(ev.target.value)} placeholder="Filter stations" type="search" value={filter} />
      </Header>
      <Main>
        {data.stations
          .filter(station => station.pattern.includes(lf))
          .map(station => (
            <div key={station.index}>
              <StationLink station={station} />
            </div>
          ))}
      </Main>
    </>
  );
}
