import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { MainMenu } from "../components/MainMenu";

export function LayoutPage() {
  return (
    <div className="flex min-h-full flex-col bg-main text-main">
      <MainMenu />
      <Outlet />
      <div className="grow" />
      <Footer />
    </div>
  );
}
