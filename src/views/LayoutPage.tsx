import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { Footer } from "../components/Footer";
import { Icon } from "../components/Icon";
import { MainMenu } from "../components/MainMenu";
import { classnames } from "../utils/classnames";

export function LayoutPage() {
  const [swipe, setSwipe] = React.useState(null);
  const navigate = useNavigate();
  const standalone = window.matchMedia("(display-mode: standalone)").matches;
  const handlers = useSwipeable(
    standalone && {
      onSwiped: ev => {
        if (Math.abs(ev.deltaX) < 50 && Math.abs(ev.deltaY) < 50) return setSwipe(null);
        if (ev.dir === "Left") navigate(1);
        if (ev.dir === "Right") navigate(-1);
        setSwipe(null);
      },
      onSwiping: ev => {
        if (Math.abs(ev.deltaX) < 50 && Math.abs(ev.deltaY) < 50) return setSwipe(null);
        setSwipe(ev.dir);
      },
      delta: 50,
    },
  );

  return (
    <div {...handlers} className="flex min-h-full flex-col bg-main text-main">
      <MainMenu />
      <div className="absolute top-1/2 right-0 left-0 flex justify-between overflow-hidden p-4">
        <div
          className={classnames(
            "relative flex h-10 w-10 items-center justify-center rounded-full bg-neutral-500 transition-transform",
            swipe !== "Right" && "-translate-x-20",
          )}
        >
          <Icon className="text-xl" icon="mdi:arrow-back" />
        </div>
        <div
          className={classnames(
            "relative flex h-10 w-10 items-center justify-center rounded-full bg-neutral-500 transition-transform",
            swipe !== "Left" && "translate-x-20",
          )}
        >
          <Icon className="text-xl" icon="mdi:arrow-forward" />
        </div>
      </div>
      <Outlet />
      <div className="grow" />
      <Footer />
    </div>
  );
}
