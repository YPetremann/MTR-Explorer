import { Icon } from "@iconify/react/dist/iconify.js";
import { classnames } from "../utils/classnames";

export function Button({ className, icon, text, children, active, ...props }) {
  return (
    <button
      className={classnames(
        "-mr-[1px] grid grid-flow-col items-center gap-2 border border-neutral-400 border-solid bg-neutral-300 p-3",
        "first:rounded-l-md last:mr-0 last:rounded-r-md hover:bg-neutral-100 disabled:bg-neutral-300 disabled:opacity-50",
        active && "bg-neutral-400 ",
        className,
      )}
      {...props}
    >
      {icon && <Icon className="text-xl" icon={icon} />}
      {text}
      {children}
    </button>
  );
}
