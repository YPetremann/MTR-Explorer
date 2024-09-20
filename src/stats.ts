import Stats from "stats.js";

var stats0 = new Stats();
stats0.showPanel(0);
stats0.dom.style.cssText =
  "position:fixed;bottom:2px;right:2px;cursor:pointer;opacity:0.9;z-index:10000";
document.body.appendChild(stats0.dom);
var stats1 = new Stats();
stats1.showPanel(1);
stats1.dom.style.cssText =
  "position:fixed;bottom:2px;right:82px;cursor:pointer;opacity:0.9;z-index:10000";
document.body.appendChild(stats1.dom);
var stats2 = new Stats();
stats2.showPanel(2);
stats2.dom.style.cssText =
  "position:fixed;bottom:50px;right:2px;cursor:pointer;opacity:0.9;z-index:10000";
document.body.appendChild(stats2.dom);
var stats3 = new Stats();
var xPanel = stats3.addPanel(new Stats.Panel("x", "#ff8", "#221"));
stats3.showPanel(3);
stats3.dom.style.cssText =
  "position:fixed;bottom:50px;right:82px;cursor:pointer;opacity:0.9;z-index:10000";
document.body.appendChild(stats3.dom);
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
