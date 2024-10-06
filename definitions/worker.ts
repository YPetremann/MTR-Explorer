export type ID = string;
export type Circular = "cw" | "ccw" | "";

export type Pos = [number, number];

export interface Station {
  /** station index */
  index: ID;
  /** station dimension */
  dim: string;
  /** station position */
  pos: Pos;
  /** station color */
  color: string;
  /** station zone */
  zone: number;
  /** station connections */
  connections: ID[];
  /** station platforms */
  platforms: ID[];
  /** station platforms */
  routes: ID[];
  /** station platforms */
  id: string;
  /** station platforms */
  name: string[];
  /** station search platforms */
  pattern: string;
}

export interface Platform {
  index: ID;
  dim: string;
  pos: Pos;
  vertical: boolean;
  station: ID;
  id: string;
  routes: ID[];
}

export interface Route {
  index: ID;
  dim: string;
  number: string;
  color: string;
  type: string;
  circular: Circular;
  stations: ID[];
  platforms: ID[];
  durations: number[];
  densities: number[];
  id: string;
  name: string[];
  pattern: string;
}

export interface Alternate {
  route: ID;
  walk: boolean;
  from: ID;
  to: ID;
}

export interface Segment {
  index: ID;
  from: ID;
  to: ID;
  distance: number;
  prev: ID[];
  next: ID[];
  walk: boolean;
  routes: ID[];
  alt: Alternate[];
}

export interface Data {
  stations: Station[];
  routes: Route[];
  platforms: Platform[];
  segments: Segment[];
}
