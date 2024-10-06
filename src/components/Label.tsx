import { Icon } from "@iconify/react/dist/iconify.js";

export function Label({ icon, text, children }) {
  return (
    <div className="-mr-[1px] grid grid-flow-col items-center border border-neutral-400 border-solid p-3 text-main first:rounded-l-md last:mr-0 last:rounded-r-md">
      {icon && <Icon className="text-xl" icon={icon} />}
      {text}
      {children}
    </div>
  );
}
