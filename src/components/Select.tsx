import { classnames } from "../utils/classnames";

export function Select({ className, children, ...props }) {
  return (
    <select
      className={classnames(
        "-mr-[1px] border-neutral-400 bg-main text-main first:rounded-l-md last:mr-0 last:rounded-r-md hover:z-50 focus:z-50 ",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
