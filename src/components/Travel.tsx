import React from "react";
import { useData } from "../context/data.ctx";

export default function Travel({ points, mode }) {
  const data = useData();
  const matrix = React.useRef([]);
  const [updated, setUpdate] = React.useState(false);
  const update = () => setUpdate((u) => !u);

  React.useEffect(() => {
    if (data?.segments) {
      matrix.current = new Map();
      for (let segment of data.segments) {
        matrix.current.set(segment, { cost: Infinity, best: null });
      }
      update();
    }
  }, [data]);
  return (
    <div>
      <h2>Result</h2>
      <p>{JSON.stringify(matrix.current.size)}</p>
    </div>
  );
}
