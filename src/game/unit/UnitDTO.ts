import Aircraft from "./Aircraft/Aircraft";
import AircraftDTO from "./Aircraft/AircraftDTO";

export default interface UnitDTO {
  type: string;
  data: AircraftDTO;
}