import { Outlet } from "react-router-dom";
import MainMenu from "../components/MainMenu";
import { Footer } from "../components/Footer";

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
