import Unit from "@/unit/Unit";
import { Scene } from "@babylonjs/core";
import Sensor from "../Sensor";
import { SensorDTO, TYPE } from "../SensorDTO";
import IrstDTO from "./IRSTDTO";

export default class Irst extends Sensor {
  type = TYPE.irst;
  irstDTO: IrstDTO;

  constructor(sensorDTO: SensorDTO, parent: Unit) {
    super(sensorDTO, parent);

    this.irstDTO = <IrstDTO>sensorDTO.data;
  }
}