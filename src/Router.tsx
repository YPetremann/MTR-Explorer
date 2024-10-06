import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ConfigPage } from "./views/ConfigPage";
import { DebugPage } from "./views/DebugPage";
import { HomePage } from "./views/HomePage";
import { IncidentPage } from "./views/IncidentPage";
import { LayoutPage } from "./views/LayoutPage";
import { MapPage } from "./views/MapPage";
import { Page404 } from "./views/Page404";
import { RoutePage } from "./views/RoutePage";
import { RoutesPage } from "./views/RoutesPage";
import { StationPage } from "./views/StationPage";
import { StationsPage } from "./views/StationsPage";
import { TravelPage } from "./views/TravelPage";

const router = createBrowserRouter(
  [
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
  ],
  { basename: "/MTR-Explorer" },
);

export function Router() {
  return <RouterProvider router={router} />;
}
