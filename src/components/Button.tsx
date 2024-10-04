import { Icon } from "@iconify/react/dist/iconify.js";

export default function Button({
  className,
  icon,
  text,
  children,
  active,
  ...props
}) {
  return (
    <button
      className={
        "bg-neutral-300 hover:bg-neutral-100 disabled:bg-neutral-300 disabled:opacity-50 border-neutral-400 border-solid p-3 border -mr-[1px] last:mr-0 first:rounded-l-md last:rounded-r-md gap-2 grid grid-flow-col items-center" +
        (active && "bg-neutral-400 ") +
        className
      }
      {...props}
    >
      {icon && <Icon className="text-xl" icon={icon} />}
      {text}
      {children}
    </button>
  );
}
