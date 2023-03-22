import Unit from "../../unit/Unit";
import Component from "../Component";
import * as SensorDTO from "./SensorDTO";

export default class Sensor extends Component {
  type: SensorDTO.TYPE;
  name: String;
  passive: boolean;
  refreshRate: number;

  enable: boolean;

  constructor(sensorDTO: SensorDTO.SensorDTO, parent: Unit) {
    super(parent);
    this.name = sensorDTO.name
    this.passive = sensorDTO.passive;
    this.refreshRate = sensorDTO.refreshRate;
  }

  update(): void {
    return
  }
}