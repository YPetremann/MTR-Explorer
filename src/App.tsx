import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LayoutPage from "./pages/LayoutPage";
import ErrorPage from "./pages/ErrorPage";
import TravelPage from "./pages/TravelPage";
import RoutesPage from "./pages/RoutesPage";
import RoutePage from "./pages/RoutePage";
import StationsPage from "./pages/StationsPage";
import StationPage from "./pages/StationPage";
import ConfigPage from "./pages/ConfigPage";
import { StationList } from "./components/StationList";
import { useData } from "./context/data.ctx";
import DebugPage from "./pages/DebugPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
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
