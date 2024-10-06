import { useAnimatedValue } from "../hooks/useAnimatedValue";
import { classnames } from "../utils/classnames";

export function Progress({ message, value, size }) {
  const tweened = useAnimatedValue(0, value, 5, 1000);
  const shouldTransition = tweened === 0 || tweened >= size.length;
  return (
    <div
      className={classnames(
        "fixed top-0 right-0 left-0 box-content flex gap-[3px] p-[2px] opacity-1 transition-opacity",
        !shouldTransition && "duration-0",
        shouldTransition && "opacity-0 duration-500",
      )}
      title={message}
    >
      {size.map((size, i) => (
        <div
          className={classnames(
            "relative h-[5px] w-1 min-w-1 max-w-full overflow-hidden bg-neutral-300",
            value === -1 && "Progress__bar--error",
          )}
          key={i}
          style={{ flexGrow: size ?? 1 }}
        >
          <div
            className={classnames("h-full bg-blue-500", value === -1 && "bg-red-500")}
            style={{ width: `${(value >= 0 ? tweened - i : 1) * 100}%` }}
          />
        </div>
      ))}
    </div>
  );
}
