import IrstDTO from "../sensors/Irst/IrstDTO";
import RadarDTO from "../sensors/radar/RadarDTO";

export default interface SensorDTO {
  type: string;
  name: String;
  passive: boolean;
  refreshRate: number;
  data: RadarDTO | IrstDTO;
}