import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import MainMenu from "../components/MainMenu";

export default function LayoutPage() {
  return (
    <div className="min-h-full bg-main text-main flex flex-col">
      <MainMenu />
      <Outlet />
      <div className="grow" />
      <Footer />
    </div>
  );
}
