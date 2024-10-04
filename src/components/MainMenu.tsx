import NavLink from "../components/NavLink";
import { Icon } from "@iconify/react/dist/iconify.js";
const navigation = [
  { href: "/travel", name: "Travel", icon: "mdi:train" },
  { href: "/map", name: "Map", icon: "mdi:map" },
  { href: "/routes", name: "Routes", icon: "mdi:map-marker" },
  { href: "/stations", name: "Stations", icon: "mdi:subway" },
  { href: "/incidents", name: "Incidents", icon: "mdi:alert" },
  { href: "/config", name: "Config", icon: "mdi:wrench" },
];
if (import.meta.env.DEV)
  navigation.push({ href: "/debug", name: "Debug", icon: "mdi:chart-arc" });
export default function MainMenu() {
  return (
    <div className="bg-menu flex-col flex-wrap md:flex-row text-menu p-2 flex">
      <NavLink to="/" className="flex-shrink-0 grow p-2 ">
        MTR Explorer
      </NavLink>
      <div className="md:flex items-center grid grid-cols-2 gap-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className="flex gap-2 items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-main hover:text-main"
            classNameActive="bg-main text-main"
          >
            <Icon icon={item.icon} />
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
