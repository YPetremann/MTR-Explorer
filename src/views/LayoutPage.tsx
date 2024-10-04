import { Outlet } from "react-router-dom";
import MainMenu from "../components/MainMenu";

export default function LayoutPage() {
  return (
    <div className="min-h-full bg-main text-main">
      <MainMenu />
      <Outlet />
    </div>
  );
}
