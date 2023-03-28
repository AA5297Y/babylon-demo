import Throttle from "@/core/tool/Throttle";
import Component from "../Component";
import FuelTank from "../fuelTank/FuelTank";
import { TYPE } from "./PropulsionDTO";

export default class Propulsion extends Component {
  type: TYPE;
  name: String;
  enable: boolean;

  altitude: number;
  speed: number;

  // update
  update() {
    //
  }

  // fuel
  fuelTanks: FuelTank[] = [];
  fuelConsumption: number;
  throttledFuelConsume = Throttle(this.fuelConsume, 1);
  
  fuelConsume() {
    let consumed = false;
    this.fuelTanks.forEach((value) => {
      if (consumed || value.empty()) {
        return;
      }

      value.consume(this.fuelConsumption);
      consumed = true;
    })

    if (!consumed) {
      this.enable = false;
    }
  }
  
  // altitude
  getAltitude2Ft(): number {
    return this.parent.position.z / 6076;
  }

}