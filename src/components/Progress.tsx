import { useAnimatedValue } from "../hooks/useAnimatedValue";
import "./Progress.scss";

export default function Progress({ message, value, size }) {
  const tweened = useAnimatedValue(0, value, 5);
  return (
    <div
      className={"Progress" + (tweened >= size.length ? " Progress--hide" : "")}
      title={message}
    >
      {size.map((size, i) => (
        <progress
          className="Progress__bar"
          key={i}
          value={tweened - i}
          max={1}
          style={{ "--size": size ?? 1 }}
        />
      ))}
    </div>
  );
}
