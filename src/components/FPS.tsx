import React from "react";
import "./FPS.scss";
export function FPS() {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    let last = performance.now();
    let cont = true;
    let frames = 0;
    ref.current!.textContent = frames;
    const loop = () => {
      const now = performance.now();
      frames++;
      if (ref.current && now - last >= 1000) {
        ref.current.textContent = frames;
        last = now;
        frames = 0;
      }
      if (cont) requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cont = false;
    };
  }, []);
  return (
    <div className="FPS">
      <span ref={ref} /> FPS
    </div>
  );
}
