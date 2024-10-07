import { disableCache, enableCache, loadIcons } from "iconify-icon";

disableCache("all");
enableCache("session");
loadIcons([
  "material-symbols:line-end-arrow",
  "material-symbols:line-end-circle",
  "material-symbols:line-start-circle",
  "material-symbols:line-start-diamond",
  "mdi:add",
  "mdi:alert",
  "mdi:auto-awesome",
  "mdi:cable-car",
  "mdi:chart-arc",
  "mdi:clock-outline",
  "mdi:close",
  "mdi:ferry",
  "mdi:gear",
  "mdi:map-marker-path",
  "mdi:map-marker",
  "mdi:map",
  "mdi:moon-and-stars",
  "mdi:pencil",
  "mdi:plane",
  "mdi:plus",
  "mdi:sail-boat",
  "mdi:search",
  "mdi:snowmobile",
  "mdi:subway",
  "mdi:swap-vertical",
  "mdi:town-hall",
  "mdi:train",
  "mdi:tram",
  "mdi:walk",
  "mdi:white-balance-sunny",
  "mdi:wrench",
  "ri:creative-commons-fill",
  "ri:creative-commons-by-fill",
  "ri:creative-commons-nc-fill",
  "ri:creative-commons-sa-fill",
]);

export function Icon({ icon, mode, inline, width, height, flip, rotate, ...rest }) {
  return (
    <span {...rest}>
      <iconify-icon
        flip={flip}
        height={height}
        icon={icon}
        inline={inline}
        mode={mode}
        noobserver={true}
        rotate={rotate}
        width={width}
      />
    </span>
  );
}
