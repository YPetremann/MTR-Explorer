import React, { Fragment } from "react";
import { Circle, Layer, Stage } from "react-konva";
import { useData } from "../contexts/data.ctx";
import useContainerDimensions from "../hooks/useContainerDimensions";

/** render on canvas the map of the network */
export default function NetworkMap({ segments }) {
  const data = useData();
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const { width } = useContainerDimensions(canvas);
  const [height, setHeight] = React.useState(0);
  const [scale, setScale] = React.useState(1);
  const [offsetX, setOffsetX] = React.useState(0);
  const [offsetY, setOffsetY] = React.useState(0);
  React.useEffect(() => {
    const bb =
      data.platforms.length > 0
        ? data.platforms.reduce(
            (p, c) => ({
              xmin: Math.min(p.xmin, c.pos.x),
              xmax: Math.max(p.xmax, c.pos.x),
              zmin: Math.min(p.zmin, c.pos.z),
              zmax: Math.max(p.zmax, c.pos.z),
            }),
            {
              xmin: Number.POSITIVE_INFINITY,
              xmax: Number.NEGATIVE_INFINITY,
              zmin: Number.POSITIVE_INFINITY,
              zmax: Number.NEGATIVE_INFINITY,
            },
          )
        : {
            xmin: 0,
            xmax: 1,
            zmin: 0,
            zmax: 1,
          };
    const outset = 5;
    const scale = Math.abs((width - outset * 2) / (bb.xmax - bb.xmin));
    setScale(scale);
    setOffsetX(bb.xmin - outset / scale);
    setOffsetY(bb.zmin - outset / scale);
    const ratio = (bb.zmax - bb.zmin) / (bb.xmax - bb.xmin);
    setHeight((canvas.current?.clientWidth ?? 0) * ratio);
  }, [data, width]);
  segments = segments?.map(id => data.segments[id]) ?? data.segments;
  return (
    <div ref={canvas}>
      <Stage
        height={height}
        offset={{ x: offsetX, y: offsetY }}
        scale={{ x: scale, y: scale }}
        style={{ background: "silver" }}
        width={width}
      >
        <Layer>
          {/*segments.map((sg) => {
            const from = data.stations[sg.from].pos;
            const to = data.stations[sg.to].pos;
            const offset = sg.routes.length / 2;
            const vector = [to[0] - from[0], to[1] - from[1]];
            const normal = [
              vector[1] / Math.hypot(...vector),
              -vector[0] / Math.hypot(...vector),
            ];

            return sg.routes
              .map((rt) => data.routes[rt] ?? { color: "black" })
              .map((rt, i) => (
                <Line
                  x={(normal[0] / scale) * (i - offset) * 2}
                  y={(normal[1] / scale) * (i - offset) * 2}
                  key={sg.index + "_" + i}
                  points={[from, to].flat()}
                  tension={0}
                  stroke={rt.color}
                  strokeWidth={2 / scale}
                />
              ));
          })*/}
          {data.stations.map(st => (
            <Fragment key={st.index}>
              <Circle fill={"black"} radius={3 / scale} x={st.pos[0]} y={st.pos[1]} />
              <Circle fill={"white"} radius={2 / scale} x={st.pos[0]} y={st.pos[1]} />
            </Fragment>
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
