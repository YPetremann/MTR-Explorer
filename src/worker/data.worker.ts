import { pl } from "@faker-js/faker";
import type {
  Data,
  Platform,
  Route,
  Segment,
  Station,
} from "../../definitions/worker";
import { RawData } from "../../definitions/data";
//MARK:- VARS

const workerData: Data = {
  stations: [],
  routes: [],
  platforms: [],
  segments: [],
};
const indexes = {
  stations: new Map(),
  platforms: new Map(),
  routes: new Map(),
  segments: new Map(),
};
const calcs = [];
const stationAttrs = [
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
];
const platformAttrs = [
  "index",
  "from",
  "to",
  "prev",
  "next",
  "dim",
  "pos",
  "vertical",
  "station",
  "route",
  "id",
];
const routeAttrs = [
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
];
const segmentAttrs = [
  "index",
  "from",
  "to",
  "distance",
  "prev",
  "next",
  "routes",
  "alt",
];
const lang_prefered = 1;
const walkSpeed = 4.137; // bloc/s

//MARK:- UTILS
function toColor(n) {
  return "#" + n.toString(16).padStart(6, "0");
}

export function locale(text) {
  if (text === undefined) return "";
  if (typeof text === "string") return text;
  const last = text.length - 1;
  const txt = text[Math.min(lang_prefered, last)];
  return txt;
}

function getStationIndex(id: string): any {
  return indexes.stations.get(id);
}
function getPlatformIndex(id: string): any {
  return indexes.platforms.get(id);
}
//MARK:- LOAD
export async function load(source, progressCb = () => {}) {
  console.time("fetch");
  progressCb([0, "Fetching data..."]);
  const dims = await getDimensionsFromSource(source);

  console.timeEnd("fetch");
  console.time("processing");

  progressCb([1, "Fixing data..."]);
  for (const dim_id in dims) {
    const dim = dims[dim_id];
    transformStations(dim.stations, dim_id);
    transformRoutes(dim.routes, dim_id);
    transformPlatforms(dim.positions, dim_id);
  }

  progressCb([1.2, "Array mutation..."]);
  const data = populateWorkerData(dims);
  data.stations.sort(byLocaleName);
  data.routes.sort(byLocaleName);
  data.stations.forEach(indexStation);
  data.platforms.forEach(indexPlatform);
  data.routes.forEach(indexRoute);

  progressCb([1.4, "Index mutation..."]);
  updateStationConnections(data);
  updatePlatformStation(data);
  updateRoutePlatforms(data);
  updateRouteStations(data);
  updatePlatformRoutes(data);
  updateStationRoutes(data);
  updateStationPlatforms(data);

  progressCb([1.6, "Segments calculation..."]);
  const segmentMap = new Map();
  createRouteSegments(data, segmentMap);
  createPlatformSegments(data, segmentMap);
  createStationSegments(data, segmentMap);
  linkSegmentToThings(data, segmentMap);
  calculateSegmentDistance(data);
  linkSegments(data.segments);

  progressCb([1.8, "Beautification..."]);
  reorderAttributes(data.stations, stationAttrs);
  reorderAttributes(data.platforms, platformAttrs);
  reorderAttributes(data.routes, routeAttrs);
  reorderAttributes(data.segments, segmentAttrs);
  deepFreeze(data);

  progressCb([2, "End..."]);
  resetCalcScore();

  console.timeEnd("processing");
}
async function getDimensionsFromSource(source: any) {
  try {
    source = new URL(source);
  } catch (e) {
    source = source;
    console.warn("source is not an URL");
  }
  if (source instanceof URL) {
    const res = await fetch(source.href);
    return await res.json();
  }
  if (typeof source === "string") {
    return JSON.parse(source);
  }
  return source;
}
function transformStations(stations, dim_id: string) {
  for (const id in stations) {
    const station = stations[id];
    station.id = id;
    station.dim = dim_id;
    station.pattern = station.name.toLowerCase();
    station.name = station.name.split("|");
    station.color = toColor(station.color);
    station.pos = { x: station.x, z: station.z };
    station.platforms = [];
    station.routes = [];
    station.next = [];
    station.prev = [];

    delete station.x;
    delete station.z;
  }
}
function transformRoutes(routes: any, dim_id: string) {
  for (const id in routes) {
    const route = routes[id];
    route.id = "" + route.color;
    route.dim = dim_id;
    route.pattern = route.name.toLowerCase();
    const [name = "", direction = ""] = route.name.split("||");
    route.name = name.split("|");
    route.direction = direction.split("|");
    route.color = toColor(route.color);
  }
}
function transformPlatforms(platforms: any, dim_id: string) {
  for (const id in platforms) {
    const platform = platforms[id];
    const [station_id, route_id] = id.split("_");
    platform.id = id;
    platform.dim = dim_id;
    platform.routes = [];
    platform.pos = { x: platform.x, z: platform.y };
    delete platform.x;
    delete platform.y;
    platform.station = station_id;
  }
}
function byLocaleName(a, b) {
  return locale(a.name).localeCompare(locale(b.name));
}
function indexStation(st: Station, i: number): void {
  st.index = i;
  indexes.stations.set(st.id, i);
}
function indexPlatform(pl: Platform, i: number): void {
  pl.index = i;
  indexes.platforms.set(pl.id, i);
}
function indexRoute(rt: Route, i: number): void {
  rt.index = i;
  const routes = indexes.routes.get(rt.id) ?? [];
  routes.push(i);
  indexes.routes.set(rt.id, routes);
}
function populateWorkerData(raw: RawData): Data {
  workerData.stations = [];
  workerData.platforms = [];
  workerData.routes = [];
  workerData.segments = [];
  for (const dim of raw) {
    for (const rt of Object.values(dim.routes)) workerData.routes.push(rt);
    for (const st of Object.values(dim.stations)) workerData.stations.push(st);
    for (const pl of Object.values(dim.positions))
      workerData.platforms.push(pl);
  }
  return workerData;
}
function updateStationConnections(data: Data) {
  for (const st of data.stations) {
    st.connections = st.connections.map((id) => indexes.stations.get(id));
  }
}
function updatePlatformStation(data: Data) {
  for (const pl of data.platforms) {
    pl.station = indexes.stations.get(pl.station);
  }
}
function updateRoutePlatforms(data: Data) {
  for (const rt of data.routes) {
    rt.platforms = rt.stations.map(getPlatformIndex);
  }
}
function updateRouteStations(data: Data) {
  for (const rt of data.routes) {
    rt.stations = rt.platforms.map((id) => data.platforms[id]?.station);
  }
}
function updatePlatformRoutes(data: Data) {
  for (const rt of data.routes) {
    for (const pl_id of rt.platforms) {
      const pl = data.platforms[pl_id];
      if (!pl.routes.includes(rt.index)) pl.routes.push(rt.index);
    }
  }
}
function updateStationRoutes(data: Data) {
  for (const rt of data.routes) {
    for (const st_id of rt.stations) {
      const st = data.stations[st_id];
      if (!st.routes.includes(rt.index)) st.routes.push(rt.index);
    }
  }
}
function updateStationPlatforms(data: Data) {
  for (const pl of data.platforms) {
    const st = data.stations[pl.station];
    if (!st) continue;
    st.platforms.push(pl.index);
  }
}
function createRouteSegments(data: Data, segmentMap: Map<string, Segment>) {
  for (const route of data.routes) {
    for (const index in route.platforms) {
      if (index == 0) continue;
      const fromPlatform = data.platforms[route.platforms[index - 1]];
      const toPlatform = data.platforms[route.platforms[index]];
      data.segments.push({
        index: data.segments.length,
        route: { type: route.type, index: route.index },
        from: { type: "platform", index: fromPlatform.index },
        to: { type: "platform", index: toPlatform.index },
        prev: [],
        next: [],
      });
    }
  }
}
function createPlatformSegments(data: Data, segmentMap: Map<string, Segment>) {
  for (const platform of data.platforms) {
    const station = data.stations[platform.station];
    data.segments.push({
      index: data.segments.length,
      route: { type: "walk", index: -1 },
      from: { type: "platform", index: platform.index },
      to: { type: "station", index: station.index },
      prev: [],
      next: [],
    });
    data.segments.push({
      index: data.segments.length,
      route: { type: "walk", index: -1 },
      from: { type: "station", index: station.index },
      to: { type: "platform", index: platform.index },
      prev: [],
      next: [],
    });
  }
}
function createStationSegments(data: Data, segmentMap: Map<string, Segment>) {
  for (const fromStation of data.stations) {
    for (const id of fromStation.connections) {
      const toStation = data.stations[id];
      if (!toStation) return;
      data.segments.push({
        index: data.segments.length,
        route: { type: "walk", index: -1 },
        from: { type: "station", station: fromStation.index },
        to: { type: "station", station: toStation.index },
        prev: [],
        next: [],
      });
    }
  }
}
function getThing(obj, type) {
  if (!type && typeof obj === "object") type = obj.type;
  const index = typeof obj === "object" ? obj.index : obj;
  switch (type) {
    case "route":
      return workerData.routes[obj];
    case "platform":
      return workerData.platforms[obj];
    case "station":
      return workerData.stations[obj];
    case "segment":
      return workerData.segments[obj];
  }
}
function linkSegmentToThings(data: Data) {
  data.segments.forEach((segment) => {
    const from = getThing(segment.from);
    from.next.push(segment.index);
    const to = getThing(segment.to);
    to.prev.push(segment.index);
  });
}
function linkSegments(segments: Segment[]) {
  segments.forEach((sgA) => {
    segments.forEach((sgB) => {
      if (sgA.from !== sgB.to) return;
      //if (sgB.from === sgA.to) return;
      sgA.prev.push(sgB.index);
      sgB.next.push(sgA.index);
    });
  });
}
function calculateSegmentDistance(data: Data) {
  data.segments.forEach((sg, i) => {
    const from = data.platforms[sg.from].pos;
    const to = data.platforms[sg.to].pos;
    const dx = from.x - to.x;
    const dz = from.z - to.z;
    sg.distance = Math.ceil(Math.hypot(dx, dz));
  });
}
function reorderAttributes(objs: any, attrs: string[]) {
  objs.forEach(function (entry, index, array) {
    const n = {};
    for (const key of attrs)
      if (key in entry) {
        n[key] = entry[key];
        delete entry[key];
      }
    array[index] = { ...n, ...entry };
  });
}
function deepFreeze(obj) {
  if (typeof obj !== "object") return;
  Object.freeze(obj);
  for (const key of Object.keys(obj)) deepFreeze(obj[key]);
}
export function getData() {
  return workerData;
}

//MARK:- PATH
type Mode = "routes" | "distance" | "duration";
const getStationIndexFromId = (id: string): number =>
  workerData.stations.findIndex((st) => st.id === id);
/**
 * Pathfinding algorithm to find the shortest path going through every stations.
 * @param stations List of stations to go through.
 * @param mode Mode of the pathfinding algorithm.
 * - "routes": Minimize the number of routes to go through.
 * - "distance": Minimize the distance to go through.
 * - "duration": Minimize the duration to go through.
 * @returns List of segments to go through.
 *
 */
export function calcPath(stations: string[], mode: Mode = "distance") {
  console.time("calcPath");
  const nodes = stations.map(getStationIndexFromId);
  const parts = nodes.slice(1).map((t, i) => [nodes[i], t]);
  let list = [];
  if (mode === "routes") list = parts.map(([f, t]) => calcPathRoutes(f, t));
  if (mode === "distance") list = parts.map(([f, t]) => calcPathDistance(f, t));
  if (mode === "duration") list = parts.map(([f, t]) => calcPathDuration(f, t));
  list = beautifyPath(list);
  console.timeEnd("calcPath");
  return list;
}
function resetCalcScore() {
  const expectedLen = workerData.segments.length;
  if (calcs.length > expectedLen) calcs.length = expectedLen;
  for (let i = 0; i < expectedLen; i++) {
    const calc = (calcs[i] = calcs[i] ?? {});
    calc.prev = Infinity;
    calc.next = Infinity;
    calc.prev_score = Infinity;
    calc.next_score = Infinity;
  }
}
/**
 * Pathfinding algorithm to find the shortest path going through every stations.
 * it minimizes the number of routes to go through.
 */
function calcPathRoutes(stations: string[]) {
  console.log("calcPathRoutes", from, to);
  return [];
}
function calcPathDistance(from, to) {
  const st_from = workerData.stations[from];
  const st_to = workerData.stations[to];
  resetCalcScore();
  const segments = new Set(st_from.next);

  // mark starting segments
  for (const seg_id of segments) {
    const calc = calcs[seg_id];
    calc.prev = -1;
    calc.prev_score = 0;
  }

  //walking through the network
  let iter = 0;
  for (const seg_id of segments) {
    iter++;
    const segment = workerData.segments[seg_id];
    const calc = calcs[seg_id];
    // get previous segment score
    calc.next_score = calc.prev_score + segment.distance;
    // scan next segments
    for (const next_id of segment.next) {
      const calc_next = calcs[next_id];
      if (calc_next.prev_score > calc.next_score) {
        calc_next.prev_score = calc.next_score;
        calc_next.prev = seg_id;
        segments.add(next_id);
      }
    }
    segments.delete(seg_id);
  }
  console.log("iterations", iter);
  const list = [];
  let prev = st_to.prev
    .toSorted((a, b) => calcs[a].next_score - calcs[b].next_score)
    .at(0);
  let chain = [];
  let chain_routes = [];
  while (prev !== -1) {
    const seg = structuredClone(workerData.segments[prev]);
    delete seg.prev;
    delete seg.next;
    list.push(seg);
    prev = calcs[prev].prev;
  }
  list.reverse();
  return list;
}
function beautifyPath(parts) {
  for (const part of parts) {
    for (const seg of part) {
      seg.from = locale(workerData.stations[seg.from].name);
      seg.to = locale(workerData.stations[seg.to].name);
    }
  }
  return parts.flat();
}
function calcPathDuration(stations: string[]) {
  console.log("calcPathDuration", from, to);
  return [];
}
function intersect(a, b) {
  return a.filter((e) => b.includes(e));
}
