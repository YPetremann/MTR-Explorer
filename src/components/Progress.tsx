import { useAnimatedValue } from "../hooks/useAnimatedValue";
import "./Progress.scss";

export default function Progress({ message, mode, value, size }) {
  const tweened = useAnimatedValue(0, value, 2);
  return (
    tweened < size.length && (
      <div className="Progress" title={message}>
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
    )
  );
}
