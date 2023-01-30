import SensorDTO from "../comps/SensorDTO";

export default interface AircraftDTO {
  callSign: string;
  name: string;
  sensors: SensorDTO[];
}