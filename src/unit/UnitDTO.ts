import CommsDTO from "@/comps/comms/CommsDTO";
import SensorDTO from "@/comps/sensors/SensorDTO";
import SignalDTO from "@/comps/signals/SignalDTO";
import { Vector3 } from "@babylonjs/core";
import Aircraft from "./Aircraft/Aircraft";
import AircraftDTO from "./Aircraft/AircraftDTO";

export default interface UnitDTO {
  type: string;
  callSign: string;
  name: string;
  sensors: SensorDTO[];
  comms: CommsDTO[];
  signals: SignalDTO[]
  turningRate: number;
  turnAroundRate: number;
  position: Vector3;
  data: AircraftDTO;
}