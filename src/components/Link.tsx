import { NavLink } from "react-router-dom";

export function Link({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending, isTransitioning }) =>
        [
          "Link",
          isPending && "Link--pending",
          isActive && "Link--active",
          isTransitioning && "Link--transitioning",
        ]
          .filter((e) => e)
          .join(" ")
      }
    >
      {children}
    </NavLink>
  );
}
