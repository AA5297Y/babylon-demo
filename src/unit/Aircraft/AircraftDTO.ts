import CommsDTO from "@/comps/comms/CommsDTO";
import SensorDTO from "../../comps/sensors/SensorDTO";
import UnitDTO from "../UnitDTO";

export default interface AircraftDTO {
  sensors: SensorDTO[];
  comms: CommsDTO[];
  turningRate: number;
  turnAroundRate: number;
  climbRate: number;
}