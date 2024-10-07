import { NavLink } from "../components/NavLink";
import { Icon } from "./Icon";
const navigation = [
  { href: "/travel", name: "Travel", icon: "mdi:train" },
  { href: "/map", name: "Map", icon: "mdi:map" },
  { href: "/routes", name: "Routes", icon: "mdi:map-marker" },
  { href: "/stations", name: "Stations", icon: "mdi:subway" },
  { href: "/incidents", name: "Incidents", icon: "mdi:alert" },
  { href: "/config", name: "Config", icon: "mdi:wrench" },
];
if (import.meta.env.MODE === "development") navigation.push({ href: "/debug", name: "Debug", icon: "mdi:chart-arc" });
export function MainMenu() {
  return (
    <div className="flex flex-col flex-wrap bg-menu p-2 text-menu md:flex-row">
      <NavLink className="flex-shrink-0 grow p-2 " to="/">
        MTR Explorer
      </NavLink>
      <div className="grid grid-cols-2 items-center gap-1 md:flex">
        {navigation.map(item => (
          <NavLink
            className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-sm hover:bg-main hover:text-main"
            classNameActive="bg-main text-main"
            key={item.name}
            to={item.href}
          >
            <Icon icon={item.icon} />
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
