import IrstDTO from "../sensors/Irst/IrstDTO";
import RadarDTO from "../sensors/radar/RadarDTO";

interface SensorDTO {
  type: String;
  name: String;
  passive: boolean;
  refreshRate: number;
  data: RadarDTO | IrstDTO;
}

enum TYPE {
  radar = 'radar',
  irst = 'irst',
}

export { SensorDTO, TYPE }
