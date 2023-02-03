import { float } from "@babylonjs/core";

export default interface RadarDTO {
  range1m2: float;
  angle: float;
  esa: boolean;
  defaultRcs: number;
  maxRcs: number;
}