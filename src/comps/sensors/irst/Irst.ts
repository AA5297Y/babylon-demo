import Unit from "@/unit/Unit";
import { Scene } from "@babylonjs/core";
import Sensor from "../Sensor";
import IrstDTO from "./IRSTDTO";

export default class Irst extends Sensor {
  irstDTO: IrstDTO;

  constructor(irstDTO: IrstDTO, parent: Unit) {
    super(parent);

    this.irstDTO = irstDTO;
  }
}