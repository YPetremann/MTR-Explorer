import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LayoutPage from "./views/LayoutPage";
import TravelPage from "./views/TravelPage";
import RoutesPage from "./views/RoutesPage";
import RoutePage from "./views/RoutePage";
import StationsPage from "./views/StationsPage";
import StationPage from "./views/StationPage";
import IncidentPage from "./views/IncidentPage";
import { StationList } from "./components/StationList";
import { useData } from "./contexts/data.ctx";
import DebugPage from "./views/DebugPage";
import Page404 from "./views/Page404";
import HomePage from "./views/HomePage";
import ConfigPage from "./views/ConfigPage";
import MapPage from "./views/MapPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "travel", element: <TravelPage /> },
      { path: "travel/:algo/*", element: <TravelPage /> },
      { path: "map", element: <MapPage /> },
      { path: "routes", element: <RoutesPage /> },
      { path: "route/:route_id", element: <RoutePage /> },
      { path: "stations", element: <StationsPage /> },
      { path: "station/:station_id", element: <StationPage /> },
      { path: "incidents", element: <IncidentPage /> },
      { path: "config", element: <ConfigPage /> },
      { path: "debug", element: <DebugPage /> },
      { path: "*", element: <Page404 /> },
    ],
  },
]);
export default function App() {
  const data = useData();
  return (
    data && (
      <>
        <StationList />
        <RouterProvider router={router} />
      </>
    )
  );
}
