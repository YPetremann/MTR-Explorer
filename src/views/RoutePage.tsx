import { useParams } from "react-router-dom";
import { useData } from "../contexts/data.ctx";
import Main from "../components/Main";
import Header from "../components/Header";
import { Line } from "../components/Line";
import RouteLink from "../components/RouteLink";
import { lang } from "../utils/lang";

export default function RoutePage() {
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
        <Line color={route.color} stations={route.stations} />
      </Main>
    </>
  );
}
