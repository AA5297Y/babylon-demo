import { Vector3 } from "@babylonjs/core";
import Aircraft from "./Aircraft/Aircraft";
import AircraftDTO from "./Aircraft/AircraftDTO";

export default interface UnitDTO {
  type: string;
  callSign: string;
  name: string;
  side: string;
  position: Vector3;
  data: AircraftDTO;
}