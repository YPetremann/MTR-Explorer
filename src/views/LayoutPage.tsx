import { Outlet } from "react-router-dom";
import NavLink from "../components/NavLink";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
const navigation = [
  { href: "/travel", name: "Travel", icon: "mdi:train" },
  { href: "/map", name: "Map", icon: "mdi:map" },
  { href: "/routes", name: "Routes", icon: "mdi:map-marker" },
  { href: "/stations", name: "Stations", icon: "mdi:subway" },
  { href: "/incidents", name: "Incidents", icon: "mdi:alert" },
  { href: "/config", name: "Config", icon: "mdi:wrench" },
];
export default function LayoutPage() {
  return (
    <div className="min-h-full">
      <div className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center text-white">
              <NavLink to="/" className="flex-shrink-0">
                MTR Explorer
              </NavLink>
              <div className="hidden md:flex ml-5 gap-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className="inline-flex gap-2 items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    classNameActive="bg-gray-900 text-white"
                  >
                    <InlineIcon icon={item.icon} />
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden grid grid-cols-2 space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="flex gap-2 items-center rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              classNameActive="bg-gray-900 text-white"
            >
              <InlineIcon icon={item.icon} />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
