import { Icon } from "@iconify/react/dist/iconify.js";
import Header from "../components/Header";
import Main from "../components/Main";
import NavLink from "../components/NavLink";
const navigation = [
  { href: "/travel", name: "Travel", icon: "mdi:train" },
  { href: "/map", name: "Map", icon: "mdi:map" },
  { href: "/routes", name: "Routes", icon: "mdi:map-marker" },
  { href: "/stations", name: "Stations", icon: "mdi:subway" },
  { href: "/incidents", name: "Incidents", icon: "mdi:alert" },
  { href: "/config", name: "Config", icon: "mdi:wrench" },
];
export default function HomePage() {
  return (
    <>
      <Header name="Welcome to MTR Explorer">
        <p>
          This is a tool to explore Minecraft Transit Railway networks. You can
          plan your journey over the network and view and report incidents on
          the network. You can also view stations and routes.
        </p>
      </Header>
      <Main>
        <div className="grid grid-cols-[128px_128px] justify-center	gap-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              aria-current={item.current ? "page" : undefined}
              className="flex flex-col items-center border border-neutral-400 bg-neutral-300 p-3"
            >
              <Icon className="text-[4em]" icon={item.icon} />
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="flex flex-col items-start gap-6">
          <section className="flex flex-col gap-2">
            <h2 className="text-xl">About me</h2>
            <p>
              I'm a solo web developer who loves the MTR mod and to challenge
              myself.
            </p>
            <p>
              I decided to build an app to explore the giant LPS MTR network.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="text-xl">Implementation details</h2>
            <p>
              The application load the data file on page load and post-process
              it to lighten future computation. Computation are done client side
              to avoid server load. It use an algorithm working in less than a
              second on big networks.
            </p>
            <p>
              Screen updates are only the result of an interaction by the user,
              this allow to display on low power devices
            </p>
            <p>Sharing journeys and using navigation history is possible.</p>
          </section>
        </div>
      </Main>
    </>
  );
}
