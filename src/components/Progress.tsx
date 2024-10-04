import { useAnimatedValue } from "../hooks/useAnimatedValue";
import classnames from "../utils/classnames";
import "./Progress.scss";

export default function Progress({ message, value, size }) {
  const tweened = useAnimatedValue(0, value, 5, 1000);
  return (
    <div
      className={classnames(
        "Progress",
        (tweened == 0 || tweened >= size.length) && " Progress--hide"
      )}
      title={message}
    >
      {size.map((size, i) => (
        <progress
          className={classnames(
            "Progress__bar",
            value === -1 && "Progress__bar--error"
          )}
          key={i}
          value={value >= 0 ? tweened - i : 1}
          max={1}
          style={{ "--size": size ?? 1 }}
        />
      ))}
    </div>
  );
}
