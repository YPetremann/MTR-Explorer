import "./App.scss";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import LayoutPage from "./views/LayoutPage";
import ErrorPage from "./views/ErrorPage";
import TravelPage from "./views/TravelPage";
import RoutesPage from "./views/RoutesPage";
import RoutePage from "./views/RoutePage";
import StationsPage from "./views/StationsPage";
import StationPage from "./views/StationPage";
import ConfigPage from "./views/ConfigPage";
import { StationList } from "./components/StationList";
import { useData } from "./contexts/data.ctx";
import DebugPage from "./views/DebugPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        // default path, redirect to search
        path: "/",
        element: <Navigate to="/search" replace={true} />,
      },
      {
        path: "search",
        element: <TravelPage />,
      },
      {
        path: "routes",
        element: <RoutesPage />,
      },
      {
        path: "route/:route_id",
        element: <RoutePage />,
      },
      {
        path: "stations",
        element: <StationsPage />,
      },
      {
        path: "station/:station_id",
        element: <StationPage />,
      },
      {
        path: "debug",
        element: <DebugPage />,
      },
      {
        path: "config",
        element: <ConfigPage />,
      },
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
