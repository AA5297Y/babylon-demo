import { Vector3 } from "@babylonjs/core";
import SensorDTO from "../../comps/sensors/SensorDTO";
import UnitDTO from "../UnitDTO";

export default interface AircraftDTO {
  sensors: SensorDTO[];
  turningRate: number;
  turnAroundRate: number;
  climbRate: number;
}