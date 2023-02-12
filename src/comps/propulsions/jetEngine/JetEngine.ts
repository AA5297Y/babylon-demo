import Throttle from "@/core/tool/Throttle";
import Unit from "@/unit/Unit";
import Altitude from "../define/Altitude";
import Speed from "../define/Speed";
import Propulsion from "../Propulsion";
import JetEngineDTO from "./JetEngineDTO";

export default class JetEngine extends Propulsion {
  type = "jetEngine";
  jetEngineDTO: JetEngineDTO;
  performance: Altitude[];
  currentAltitude: Altitude;
  nextAltitude: Altitude;
  currentSpeed: Speed;
  nextSpeed: Speed;

  altitudeRatio: number = 1;

  speedRatio: number = 1;
  targetSpeed: number;
  speed: number;

  constructor(jetEngineDTO: JetEngineDTO, parent: Unit) {
    super(parent);
    this.jetEngineDTO = jetEngineDTO;
    this.performance = this.jetEngineDTO.performance;

    this.init();
  }

  init() {
    const update = () => {
      
    }
  }

  // altitude
  getAltitude2Ft() {
    return this.parent.position.z / 6076;
  }

  updateAltitude() {
    for (let i = 0; i < this.performance.length; i++) {
      const altitude = this.getAltitude2Ft();
      if (altitude >= this.performance[i].altitude) {
        this.currentAltitude = this.performance[i];

        // max altitude
        if (i + 1 == this.performance.length) {
          this.altitudeRatio = 1;
        }
      }
    }
  }

  linear

  // speed
  updateSpeed() {
    for (let i = 0; i < this.performance.length; i++) {
      if (this.speed >= this.currentAltitude.speed[i].speed) {
        
      }
    }
  }

  update() {

  }
}