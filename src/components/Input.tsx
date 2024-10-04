import { Icon } from "@iconify/react/dist/iconify.js";

export default function Input({ className, ...props }) {
  return (
    <input
      className={
        "-mr-[1px] last:mr-0 focus:z-50 hover:z-50 border-neutral-400 bg-main text-main first:rounded-l-md last:rounded-r-md " +
        className
      }
      {...props}
    />
  );
}
