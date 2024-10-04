import { Icon } from "@iconify/react/dist/iconify.js";

export default function Label({ icon, text, children }) {
  return (
    <div className="border border-neutral-400 text-main border-solid -mr-[1px] last:mr-0 p-3 first:rounded-l-md last:rounded-r-md grid grid-flow-col items-center">
      {icon && <Icon className="text-xl" icon={icon} />}
      {text}
      {children}
    </div>
  );
}
