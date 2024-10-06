import { NavLink as OrignalNavLink } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavLink({
  className,
  classNamePending,
  classNameActive,
  classNameTransitioning,
  children,
  ...props
}) {
  return (
    <OrignalNavLink
      {...props}
      className={({ isActive, isPending, isTransitioning }) =>
        classNames(
          className,
          isPending && classNamePending,
          isActive && classNameActive,
          isTransitioning && classNameTransitioning,
        )
      }
    >
      {children}
    </OrignalNavLink>
  );
}
