import { classnames } from "../utils/classnames";
import { StationLink } from "./StationLink";

export function DotStation({ index, minor, major }) {
  const unspec = !(major || minor);
  return (
    <div className={classnames("flex items-center gap-[5px]", major && "font-bold", minor && "text-s")}>
      <div
        className={classnames(
          "border-main border-solid bg-main",
          unspec && "m-[1px] size-[14px] rounded-full border-[3px]",
          major && "m-[1px] size-[14px] rotate-45 border-[3px]",
          minor && "m-[3px] size-[10px] rounded-full border-[2px]",
        )}
      />
      <StationLink index={index} />
    </div>
  );
}
