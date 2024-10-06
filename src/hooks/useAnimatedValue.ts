import React from "react";

/**
 * Animate value from start to target with a given rate.
 * @param {number} start - The starting value.
 * @param {number} target - The target value, this can change over time.
 * @param {number} ratep - The up rate of change par second.
 * @param {number} rates - The down rate of change par second.
 * @returns {number} The animated value.
 *
 * internaly it use requestAnimationFrame to animate the value.
 */
export function useAnimatedValue(start, target, ratep, rates) {
  const [value, setValue] = React.useState(start);
  React.useEffect(() => {
    let last = Date.now();
    let frame;
    function update() {
      const now = Date.now();
      const delta = (now - last) / 1000;
      last = now;
      frame = requestAnimationFrame(update);
      setValue(value => {
        if (value === target) cancelAnimationFrame(frame);
        return value < target
          ? Math.min(value + ratep * delta, target)
          : Math.max(value - (rates ?? ratep) * delta, target);
      });
    }
    update();
    return () => cancelAnimationFrame(frame);
  }, [target, ratep, rates]);
  return value;
}
