import type { RawData } from "../../definitions/data";
import type { Data, Platform, Route, Segment, Station } from "../../definitions/worker";
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

const STATION_ATTRS = [
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
const PLATFORM_ATTRS = ["index", "from", "to", "prev", "next", "dim", "pos", "vertical", "station", "route", "id"];
const ROUTE_ATTRS = [
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
const SEGMENT_ATTRS = ["index", "route", "from", "to", "distance", "duration", "prev", "next"];
const LANG_PREFERED = 1;
const WALK_SPEED = 4.137 / 20; // bloc/tick
const WAIT_DELAY = 20 * 90; // 60 seconds

//MARK:- UTILS
const toColor = n => "#" + n.toString(16).padStart(6, "0");
export function locale(text) {
  if (text === undefined) return "";
  if (typeof text === "string") return text;
  const last = text.length - 1;
  const txt = text[Math.min(LANG_PREFERED, last)];
  return txt;
}

function getPlatformIndex(id: string) {
  return indexes.platforms.get(id);
}
//MARK:- LOAD
export async function load(source, progressCb = () => {}) {
  try {
    console.time("fetch");
    progressCb([0.5, "Fetching data..."]);
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
    linkSegmentsTogether(data.segments);

    progressCb([1.8, "Beautification..."]);
    reorderAttributes(data.stations, STATION_ATTRS);
    reorderAttributes(data.platforms, PLATFORM_ATTRS);
    reorderAttributes(data.routes, ROUTE_ATTRS);
    reorderAttributes(data.segments, SEGMENT_ATTRS);
    deepFreeze(data.stations);
    deepFreeze(data.platforms);
    deepFreeze(data.routes);
    deepFreeze(data.segments);

    progressCb([2, "End..."]);
    resetCalcScore();
    console.timeEnd("processing");
  } catch (e) {
    progressCb([-1, e.message]);
    console.warn(e);
  }
}
async function getDimensionsFromSource(source) {
  try {
    source = new URL(source);
  } catch (err) {
    console.warn(err.message, source);
  }
  if (source instanceof URL) {
    const res = await fetch(source.href);
    return await res.json();
  }
  if (typeof source === "string") {
    return JSON.parse(source);
  }
  if (typeof source !== "object") throw new Error("Invalid data source");
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
function transformRoutes(routes, dim_id: string) {
  for (const id in routes) {
    const route = routes[id];
    route.id = "" + route.color;
    route.dim = dim_id;
    route.pattern = route.name.toLowerCase();
    const [name = "", direction = ""] = route.name.split("||");
    route.number = route.number.split("|");
    route.name = name.split("|");
    route.direction = direction.split("|");
    route.color = toColor(route.color);
  }
}
function transformPlatforms(platforms, dim_id: string) {
  for (const id in platforms) {
    const platform = platforms[id];
    const [station_id] = id.split("_");
    platform.id = id;
    platform.dim = dim_id;
    platform.routes = [];
    platform.next = [];
    platform.prev = [];
    platform.station = station_id;
    platform.pos = { x: platform.x, z: platform.y };
    delete platform.x;
    delete platform.y;
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
    for (const pl of Object.values(dim.positions)) workerData.platforms.push(pl);
  }
  return workerData;
}
function updateStationConnections(data: Data) {
  for (const st of data.stations) {
    st.connections = st.connections.map(id => indexes.stations.get(id));
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
    rt.stations = rt.platforms.map(id => data.platforms[id]?.station);
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
function createRouteSegments(data: Data) {
  for (const route of data.routes) {
    for (const index in route.platforms) {
      if (index == 0) continue;
      const fromPlatform = data.platforms[route.platforms[index - 1]];
      const toPlatform = data.platforms[route.platforms[index]];
      const distance = Math.hypot(fromPlatform.pos.x - toPlatform.pos.x, fromPlatform.pos.z - toPlatform.pos.z);
      const duration = route.durations[index - 1] || distance / WALK_SPEED;
      //*
      data.segments.push({
        index: data.segments.length,
        route: { type: route.type, index: route.index },
        from: { type: "platform", index: fromPlatform.index },
        to: { type: "platform", index: toPlatform.index },
        distance: Math.ceil(distance),
        duration: Math.ceil(duration),
        prev: [],
        next: [],
      });
      /*/
      const ps_index = data.segments.length;
      const ss_index = ps_index + 1;
      const sp_index = ss_index + 1;
      console.log(fromPlatform);
      data.segments.push({
        index: ps_index,
        route: { type: "wait", index: -2 },
        from: { type: "platform", index: fromPlatform.station },
        to: { type: "stop", index: fromPlatform.index },
        distance: 10,
        duration: 0,
        wait: WAIT_DELAY,
        prev: [],
        next: [ss_index],
      });
      data.segments.push({
        index: ss_index,
        route: { type: route.type, index: route.index },
        from: { type: "stop", index: fromPlatform.index },
        to: { type: "stop", index: toPlatform.index },
        distance: Math.ceil(distance),
        duration: Math.ceil(duration),
        prev: [ ps_index ],
        next: [ sp_index ],
      });
      data.segments.push({
        index: sp_index,
        route: { type: "walk", index: -1 },
        from: { type: "stop", index: toPlatform.index },
        to: { type: "platform", index: toPlatform.station },
        distance: 10,
        duration: 20,
        prev: [ss_index],
        next: [],
      });
      */
    }
  }
}
function createPlatformSegments(data: Data) {
  for (const platform of data.platforms) {
    const station = data.stations[platform.station];
    const distance = Math.hypot(platform.pos.x - station.pos.x, platform.pos.z - station.pos.z);
    const duration = (distance * 2) / WALK_SPEED;
    data.segments.push({
      index: data.segments.length,
      route: { type: "walk", index: -1 },
      from: { type: "platform", index: platform.index },
      to: { type: "station", index: station.index },
      distance: Math.ceil(distance),
      duration: Math.ceil(duration),
      prev: [],
      next: [],
    });
    data.segments.push({
      index: data.segments.length,
      route: { type: "walk", index: -1 },
      from: { type: "station", index: station.index },
      to: { type: "platform", index: platform.index },
      distance: Math.ceil(distance),
      duration: Math.ceil(duration),
      wait: WAIT_DELAY, // TODO remove when stops implemented
      prev: [],
      next: [],
    });
  }
}
function createStationSegments(data: Data) {
  for (const fromStation of data.stations) {
    for (const id of fromStation.connections) {
      const toStation = data.stations[id];
      if (!toStation) return;
      const distance = Math.hypot(fromStation.pos.x - toStation.pos.x, fromStation.pos.z - toStation.pos.z);
      const duration = (distance * 2) / WALK_SPEED;

      data.segments.push({
        index: data.segments.length,
        route: { type: "walk", index: -1 },
        from: { type: "station", index: fromStation.index },
        to: { type: "station", index: toStation.index },
        distance: Math.ceil(distance),
        duration: Math.ceil(duration),
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
      return workerData.routes[index];
    case "platform":
      return workerData.platforms[index];
    case "station":
      return workerData.stations[index];
    case "segment":
      return workerData.segments[index];
  }
}
function linkSegmentToThings(data: Data) {
  data.segments.forEach(segment => {
    getThing(segment.from).next.push(segment.index);
    getThing(segment.to).prev.push(segment.index);
  });
}
function linkSegmentsTogether() {
  for (const segment of workerData.segments) {
    const index = segment.index;
    const prev = getThing(segment.from).prev;
    const next = getThing(segment.to).next;
    segment.prev = prev.filter(id => id !== index);
    segment.next = next.filter(id => id !== index);
  }
}

function reorderAttributes(objs, attrs: string[]) {
  objs.forEach((entry, index, array) => {
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
type Calc = {
  wait: number;
  prev: number;
  next: number;
  prev_score: number;
  next_score: number;
};

const Scoring = {
  duration: (calc, segment) => calc.prev_score + segment.duration + calc.wait,
  distance: (calc, segment) => calc.prev_score + segment.distance,
  routes: (calc, segment) => {
    const prev = getThing(calc.prev, "segment");
    const routeCur = segment.route.index;
    const routePrev = prev?.route?.index ?? -1;
    const increment = routeCur < 0 || routeCur !== routePrev ? 1 : 0;
    return calc.prev_score + increment;
  },
  uniform: calc => calc.prev_score + 1,
};
/**
 * Pathfinding algorithm to find the shortest path going through every stations.
 * @param nodes List of stations to go through.
 * @param mode Mode of the pathfinding algorithm.
 * - "routes": Minimize the number of routes to go through.
 * - "distance": Minimize the distance to go through.
 * - "duration": Minimize the duration to go through.
 * @returns List of segments to go through.
 *
 */
export function calcPath(nodes: string[], mode: Mode = "distance") {
  console.time("calcPath");
  const stations = workerData.stations;
  nodes = nodes.map(id => stations.findIndex(st => st.id === id));
  const parts = nodes.slice(1).map((t, i) => [nodes[i], t]);
  const scoring = Scoring[mode] ?? Scoring.uniform;
  const list = parts.map(([f, t]) => calcPathGen(f, t, scoring));
  console.timeEnd("calcPath");
  return beautifyPath(list);
}
function resetCalcScore() {
  const expectedLen = workerData.segments.length;
  if (calcs.length > expectedLen) calcs.length = expectedLen;
  for (let i = 0; i < expectedLen; i++) {
    const calc = (calcs[i] = calcs[i] ?? {});
    calc.wait = 0;
    calc.prev = Number.POSITIVE_INFINITY;
    calc.next = Number.POSITIVE_INFINITY;
    calc.prev_score = Number.POSITIVE_INFINITY;
    calc.next_score = Number.POSITIVE_INFINITY;
  }
}
function calcPathGen(from, to, scoring: (calc: Calc, segment: Segment) => number) {
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
  for (const seg_id of segments) {
    const segment = workerData.segments[seg_id];
    const calc = calcs[seg_id];
    // get previous segment score
    calc.wait = segment.wait ?? 0;
    calc.next_score = scoring(calc, segment);
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

  // travel back from destination to origin
  let prev = st_to.prev.toSorted((a, b) => calcs[a].next_score - calcs[b].next_score).at(0);
  const chain = [];
  while (prev !== -1) {
    const seg = structuredClone(workerData.segments[prev]);
    if (seg.wait) {
      // add a wait segment
      const wait = {
        ...seg,
        route: { type: "wait", index: -2 },
        from: seg.to,
        to: seg.to,
        distance: 0,
        duration: calcs[prev].wait,
      };
      delete wait.index;
      delete wait.prev;
      delete wait.next;
      chain.push(wait);
    }
    delete seg.index;
    delete seg.prev;
    delete seg.next;
    chain.push(seg);
    prev = calcs[prev].prev;
  }
  chain.reverse();
  return chain;
}

/**
 * Pathfinding algorithm to find the shortest path going through every stations.
 * it minimizes the number of routes to go through.
 */

type Part = PathSegment[];
interface PathSegment {
  route: { type: string; index: number };
  from: { type: string; index: number };
  to: { type: string; index: number };
  distance: number;
  duration: number;
}
function beautifyPath(parts: Part[]) {
  for (const part of parts) {
    // add station counter
    for (const seg of part) seg.station = seg.route.index < 0 ? 0 : 1;

    // merge segments where route have same index
    //*
    for (let i = 0; i < part.length - 1; i++) {
      const seg = part[i];
      const next = part[i + 1];
      if (seg.route.index === next.route.index) {
        seg.to = next.to;
        seg.station += next.station;
        seg.distance += next.distance;
        seg.duration += next.duration;
        part.splice(i + 1, 1);
        i--;
      }
    }
    //*/
  }
  return parts;
}
