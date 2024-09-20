import { pl } from "@faker-js/faker";
import { timeout } from "../utils/timeout";
import type { Data } from "../api/worker";

let data: Data = {
  stations: [],
  routes: [],
  platforms: [],
  segments: [],
};

function toColor(n) {
  return "#" + n.toString(16).padStart(6, "0");
}

export default function processData(raw: RawData): Data {}

const prefered = 1;
export function lang(text) {
  if (text === undefined) return "";
  if (typeof text === "string") return text;
  const last = text.length - 1;
  const txt = text[Math.min(prefered, last)];
  return txt;
}

export async function load(source, progressCb) {
  const nd = {
    stations: new Array<Station>(),
    platforms: new Array<Platform>(),
    routes: new Array<Route>(),
    segments: new Array<Segments>(),
  };
  const indexes = {
    stations: new Map(),
    platforms: new Map(),
    routes: new Map(),
    segments: new Map(),
  };

  progressCb([0, "Fetching data..."]);
  const res = await fetch(source);

  progressCb([0.5, "Parsing data..."]);
  const raw = await res.json();

  progressCb([1, "Fixing data..."]);
  for (const [dim_id, dim] of Object.entries(raw)) {
    for (const [st_id, st] of Object.entries(dim.stations)) {
      st.id = st_id;
      st.dim = dim_id;
      st.pattern = st.name;
      st.name = st.name.split("|");
      st.color = toColor(st.color);
      st.pos = [st.x, st.z];
      delete st.x;
      delete st.z;
    }
    for (const [rt_id, rt] of Object.entries(dim.routes)) {
      rt.id = "" + rt.color;
      rt.dim = dim_id;
      rt.pattern = rt.name;
      const [name = "", direction = ""] = rt.name.split("||");
      rt.name = name.split("|");
      rt.direction = direction.split("|");
      rt.color = toColor(rt.color);
    }
    for (const [pos_id, pos] of Object.entries(dim.positions)) {
      const [station_id, route_id] = pos_id.split("_");
      pos.id = pos_id;
      pos.pos = [pos.x, pos.y];
      delete pos.x;
      delete pos.y;
      pos.dim = dim_id;
      pos.station = station_id;
    }
  }

  progressCb([1.25, "Array mutation..."]);
  for (const dim of raw) {
    for (const rt of dim.routes) nd.routes.push(rt);
    for (const st of Object.values(dim.stations)) nd.stations.push(st);
    for (const pl of Object.values(dim.positions)) nd.platforms.push(pl);
  }

  nd.stations.sort((a, b) => lang(a.name[0]).localeCompare(lang(b.name[0])));
  nd.routes.sort((a, b) => lang(a.name[0]).localeCompare(lang(b.name[0])));

  nd.stations.forEach((st, i) => {
    st.index = i;
    indexes.stations.set(st.id, i);
  });
  nd.platforms.forEach((pl, i) => {
    pl.index = i;
    indexes.platforms.set(pl.id, i);
  });
  nd.routes.forEach((rt, i) => {
    rt.index = i;
    const routes = indexes.routes.get(rt.id) ?? [];
    routes.push(i);
    indexes.routes.set(rt.id, routes);
  });

  progressCb([1.5, "Index mutation..."]);
  nd.stations.forEach((st, i) => {
    st.connections = st.connections.map((id) => indexes.stations.get(id));
    st.platforms = [];
    st.routes = [];
  });
  nd.platforms.forEach((pl, i) => {
    pl.station = indexes.stations.get(pl.station);
    pl.routes = [];
  });
  nd.routes.forEach((rt, rt_id) => {
    rt.platforms = rt.stations.map((id) => indexes.platforms.get(id));
    rt.stations = rt.platforms.map((id) => nd.platforms[id]?.station);
    rt.platforms.forEach((pl_id) => {
      const pl = nd.platforms[pl_id];
      if (!pl.routes.includes(rt_id)) pl.routes.push(rt_id);
    });
    rt.stations.forEach((st_id) => {
      const st = nd.stations[st_id];
      if (!st.routes.includes(rt_id)) st.routes.push(rt_id);
    });
  });
  nd.platforms.forEach((pl, i) => {
    const st = nd.stations[pl.station];
    if (!st) return;
    st.platforms.push(i);
  });

  progressCb([1.75, "Segments calculation..."]);
  const segments = new Map();
  nd.routes.forEach((rt, i) => {
    let pl_from, from;
    for (const pl_to of rt.platforms) {
      const to = nd.platforms[pl_to].station;
      if (from) {
        const id = `${from} ${to}`;
        let seg = segments.get(id);
        if (!seg) {
          seg = { from, to, routes: [], alt: [] };
          nd.segments.push(seg);
          segments.set(id, seg);
        }
        seg.routes.push(rt.index);
        seg.alt.push({ route: rt.index, from: pl_from, to: pl_to });
      }
      pl_from = pl_to;
      from = to;
    }
  });
  nd.stations.forEach((from) => {
    from.connections.forEach((to_id) => {
      const to = nd.stations[to_id];
      if (!to) return;
      const id = `${from.index} ${to.index}`;
      let seg = segments.get(id);
      if (!seg) {
        seg = {
          from: from.index,
          to: to.index,
          routes: [],
          alt: [],
        };
        nd.segments.push(seg);
        segments.set(id, seg);
      }
      seg.walk = true;
      seg.alt.push({ walk: true, from: from.index, to: to.index });
    });
  });

  nd.segments.forEach((seg, i) => {
    seg.index = i;
    const from = nd.stations[seg.from].pos;
    const to = nd.stations[seg.to].pos;
    seg.distance = Math.ceil(
      Math.sqrt((from[0] - to[0]) ** 2 + (from[1] - to[1]) ** 2)
    );
    seg.prev = [];
    seg.next = [];
  });

  nd.segments.forEach((segA, iA) => {
    nd.segments.forEach((segB, iB) => {
      if (segA.from !== segB.to) return;
      if (segB.from === segA.to) return;
      segA.prev.push(iB);
      segB.next.push(iA);
    });
  });

  progressCb([1.75, "Beautification..."]);
  nd.stations.forEach(
    simple_reorder([
      "index",
      "dim",
      "pos",
      "color",
      "zone",
      "connections",
      "platforms",
      "routes",
      "id",
      "name",
      "pattern",
    ])
  );
  nd.platforms.forEach(
    simple_reorder([
      "index",
      "dim",
      "pos",
      "vertical",
      "station",
      "route",
      "id",
    ])
  );
  nd.routes.forEach(
    simple_reorder([
      "index",
      "dim",
      "number",
      "color",
      "type",
      "circular",
      "stations",
      "platforms",
      "durations",
      "densities",
      "id",
      "name",
      "pattern",
    ])
  );
  nd.segments.forEach(
    simple_reorder([
      "index",
      "from",
      "to",
      "distance",
      "prev",
      "next",
      "walk",
      "routes",
      "alt",
    ])
  );
  progressCb([2, "End..."]);
  data = nd;
}

function simple_reorder(columns = []) {
  return function (entry, index, array) {
    const n = {};
    for (const key of columns)
      if (key in entry) {
        n[key] = entry[key];
        delete entry[key];
      }
    array[index] = { ...n, ...entry };
  };
}

export function getData() {
  return data;
}

type Mode = "lines" | "distance" | "duration";
/**
 * Pathfinding algorithm to find the shortest path going through every stations.
 * @param stations List of stations to go through.
 * @param mode Mode of the pathfinding algorithm.
 * @returns List of segments to go through.
 *
 */
export function getPath(stations: string[], mode) {}
