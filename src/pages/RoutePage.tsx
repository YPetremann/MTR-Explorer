import { useParams } from "react-router-dom";
import { useData } from "../context/data.ctx";
import RouteDetail from "../components/RouteDetail";

export default function RoutePage() {
  const data = useData();
  const params = useParams();
  const route = data.routes[params.route_id];
  if (!route) return <></>;
  return <RouteDetail route={route} />;
}
