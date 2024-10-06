import classnames from "../utils/classnames";
import StationLink from "./StationLink";

export default function DotStation({ index, minor, major }) {
  const unspec = !major && !minor;
  return (
    <div className={classnames("flex items-center gap-[5px] DS", major && "font-bold", minor && "text-s")}>
      <div
        className={classnames(
          "border-main bg-main border-solid",
          unspec && "size-[14px] m-[1px] border-[3px] rounded-full",
          major && "size-[14px] m-[1px] border-[3px] rotate-45",
          minor && "size-[10px] m-[3px] border-[2px] rounded-full",
        )}
      />
      <StationLink index={index} />
    </div>
  );
}
