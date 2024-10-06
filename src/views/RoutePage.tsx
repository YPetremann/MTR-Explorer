import { useParams } from "react-router-dom";
import { DotStation } from "../components/DotStation";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { RouteLink } from "../components/RouteLink";
import { useData } from "../contexts/data.ctx";
import { lang } from "../utils/lang";

export function RoutePage() {
  const data = useData();
  const params = useParams();
  const route = data.routes[params.route_id];
  if (!route) return <></>;
  const number = lang(route.number);
  const dir = lang(route.direction);
  const circular = route.circular;
  return (
    <>
      <Header name={<RouteLink index={route.index} />}>
        <div className="break-words">
          {circular && <div>{`circular: ${circular}`}</div>}
          {number && <div>{`number: ${number}`}</div>}
          {dir && <div>{`direction: ${dir}`}</div>}
        </div>
      </Header>
      <Main>
        <div className="grid">
          <div className="col-start-1 row-start-1 m-[5px] border-l-[7px]" style={{ borderColor: route.color }} />
          <div className="col-start-1 row-start-1">
            {route.stations.map((station, index, a) => (
              <DotStation index={station} key={index} minor={index > 0 && index < a.length - 1} />
            ))}
          </div>
        </div>
      </Main>
    </>
  );
}
