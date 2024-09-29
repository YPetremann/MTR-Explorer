import { useParams } from "react-router-dom";
import { useData } from "../contexts/data.ctx";
import StationLink from "../components/StationLink";
import Header from "../components/Header";
import Main from "../components/Main";
import RouteLink from "../components/RouteLink";

export default function StationPage() {
  const data = useData();
  const params = useParams();
  const station = data.stations[params.station_id];
  if (!station) return <></>;
  return (
    <>
      <Header name={<StationLink index={station.index} />}></Header>
      <div style={{ height: "6px", background: station.color }}></div>
      <Main>
        {!!station.connections.length && (
          <div className="flex flex-col items-start gap-1 mb-5">
            <h2 className="text-xl">Connections:</h2>
            {station.connections.map((index) => (
              <StationLink key={index} index={index} />
            ))}
          </div>
        )}

        <div className="flex flex-col items-start gap-1 mb-5">
          <h2 className="text-xl">Routes:</h2>
          {station.routes.map((index) => (
            <RouteLink key={index} index={index} />
          ))}
        </div>
      </Main>
    </>
  );
}
