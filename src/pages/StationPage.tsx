import { useParams } from "react-router-dom";
import { useData } from "../context/data.ctx";
import StationDetail from "../components/StationDetail";

export default function StationPage() {
  const data = useData();
  const params = useParams();
  const station = data.stations[params.station_id];
  if (!station) return <></>;
  return <StationDetail station={station} />;
}
