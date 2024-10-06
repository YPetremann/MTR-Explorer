//https://letsplay.minecrafttransitrailway.com/system-map/data

export type ID = string;
export type RawCircular = "cw" | "ccw" | "";
export interface RawRoute {
  color: number;
  name: string;
  number: string;
  type: RawType;
  stations: ID[];
  durations: number[];
  densities: number[];
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
  connections: ID[];
  positions?: ID[];
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
  routes: RawRoute[];
  positions: Map<string, RawPosition>;
  stations: Map<ID, RawStation>;
  types: RawType[];
}

export type RawData = RawDimension[];
