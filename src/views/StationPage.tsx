import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Main from "../components/Main";
import RouteLink from "../components/RouteLink";
import StationLink from "../components/StationLink";
import { useData } from "../contexts/data.ctx";

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
            {station.connections.map(index => (
              <StationLink index={index} key={index} />
            ))}
          </div>
        )}

        <div className="flex flex-col items-start gap-1 mb-5">
          <h2 className="text-xl">Routes:</h2>
          {station.routes.map(index => (
            <RouteLink index={index} key={index} />
          ))}
        </div>
      </Main>
    </>
  );
}
