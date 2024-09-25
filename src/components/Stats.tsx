import React from "react";
import Stat from "stats.js";

export default function Stats() {
  const container = React.useRef();
  React.useEffect(() => {
    const ct = container.current;
    if (!ct) return;

    var stats0 = new Stat();
    stats0.showPanel(0);
    stats0.dom.style.cssText = "pointer-events: none;";
    ct.appendChild(stats0.dom);

    var stats1 = new Stat();
    stats1.showPanel(1);
    stats1.dom.style.cssText = "pointer-events: none;";
    ct.appendChild(stats1.dom);

    var stats2 = new Stat();
    stats2.showPanel(2);
    stats2.dom.style.cssText = "pointer-events: none;";
    ct.appendChild(stats2.dom);

    var stats3 = new Stat();
    var xPanel = stats3.addPanel(new Stat.Panel("x", "#ff8", "#221"));
    stats3.showPanel(3);
    stats3.dom.style.cssText = "pointer-events: none;";
    ct.appendChild(stats3.dom);

    function animate() {
      stats0.end();
      stats1.end();
      stats2.end();
      stats3.end();
      const d = performance.now() * 0.06;
      const v = Math.abs((d % 60) - 30);
      xPanel.update(v, 30);
      stats0.begin();
      stats1.begin();
      stats2.begin();
      stats3.begin();
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    return () => {
      stats0.dom.remove();
      stats1.dom.remove();
      stats2.dom.remove();
      stats3.dom.remove();
    };
  }, []);
  return <div className="flex row" ref={container} />;
}
