import React from "react";
import { useData } from "../contexts/data.ctx";
import StationLink from "../components/StationLink";
import Header from "../components/Header";
import Main from "../components/Main";
import Input from "../components/Input";

export default function StationsPage() {
  const [filter, setFilter] = React.useState("");
  const data = useData();
  const lf = filter.toLowerCase();

  return (
    <>
      <Header name="Stations">
        <Input
          type="search"
          placeholder="Filter stations"
          value={filter}
          onChange={(ev) => setFilter(ev.target.value)}
        />
      </Header>
      <Main>
        {data.stations
          .filter((station) => station.pattern.includes(lf))
          .map((station) => (
            <div key={station.index}>
              <StationLink station={station} />
            </div>
          ))}
      </Main>
    </>
  );
}
