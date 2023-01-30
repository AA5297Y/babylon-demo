import IrstDTO from "./sensors/IRSTDTO";
import RadarDTO from "./sensors/RadarDTO";

export default interface SensorDTO {
  type: string
  data: RadarDTO | IrstDTO;
}