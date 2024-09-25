import { Outlet } from "react-router-dom";
import "./LayoutPage.scss";
import { Link } from "../components/Link";
export default function LayoutPage() {
  return (
    <>
      <header className="Header">
        MTR:Helper
        <Link to="/search">Search</Link>
        <Link to="/routes">Routes</Link>
        <Link to="/stations">Stations</Link>
        <Link to="/debug">Debug</Link>
      </header>
      <Outlet />
    </>
  );
}
