//https://letsplay.minecrafttransitrailway.com/system-map/data

export type ID = string;
export type RawCircular = "cw" | "ccw" | "";
export interface RawRoute {
  color: number;
  name: string;
  number: string;
  type: RawType;
  stations: Array<ID>;
  durations: Array<number>;
  densities: Array<number>;
  circular: RawCircular;
}
export interface RawPosition {
  x: number;
  z: number;
  vertical: boolean;
}
export interface RawStation {
  name: string;
  color: number;
  zone: number;
  x: number;
  z: number;
  connections: Array<ID>;
  positions?: Array<ID>;
}
export type RawType =
  | "train_normal"
  | "train_light_rail"
  | "train_high_speed"
  | "boat_normal"
  | "boat_light_rail"
  | "boat_high_speed"
  | "cable_car_normal"
  | "airplane_normal";

export interface RawDimension {
  routes: Array<RawRoute>;
  positions: Map<string, RawPosition>;
  stations: Map<ID, RawStation>;
  types: Array<RawType>;
}

export type RawData = Array<RawDimension>;
