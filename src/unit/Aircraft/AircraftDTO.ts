import { Vector3 } from "@babylonjs/core";
import SensorDTO from "../../comps/sensors/SensorDTO";

export default interface AircraftDTO {
  callSign: string;
  name: string;
  position: Vector3;
  sensors: SensorDTO[];
  turningRate: number;
  turnAroundRate: number;
  climbRate: number;
}