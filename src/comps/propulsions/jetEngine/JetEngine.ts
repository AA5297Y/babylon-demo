import Throttle from "@/core/tool/Throttle";
import Unit from "@/unit/Unit";
import Altitude from "../STATE_DEFINE/Altitude";
import Speed from "../STATE_DEFINE/Speed";
import Propulsion from "../Propulsion";
import JetEngineDTO from "./JetEngineDTO";
import * as PropulsionDTO from "../PropulsionDTO";

export default class JetEngine extends Propulsion {
  type = PropulsionDTO.TYPE.jetEngine;
  jetEngineDTO: JetEngineDTO;
  performance: Altitude[];
  currentAltitude: Altitude;
  nextAltitude: Altitude;
  currentSpeed: Speed;
  nextSpeed: Speed;

  altitudeRatio: number = 1;

  speedRatio: number = 1;

  constructor(jetEngineDTO: JetEngineDTO, parent: Unit) {
    super(parent);
    this.jetEngineDTO = jetEngineDTO;
    this.performance = this.jetEngineDTO.performance;

    this.enable = true;

    this.init();
  }

  init() {
    

    this.update = () => {
      if (this.available && this.enable) {
        this.updateAltitude();
        this.updateSpeed();

        this.throttledFuelConsume(this);
      }
    }
    
    this.parent.core.scene.onBeforeRenderObservable.add(this.update)
  }

  updateAltitude() {
    let altitude = this.getAltitude2Ft();

    // fix minimalAltitude
    if (altitude < this.performance[0].altitude) {
      this.altitude = this.performance[0].altitude;

      altitude = this.altitude;
    }

    for (let i = this.performance.length - 1; i >= 0; i--) {
      if (altitude >= this.performance[i].altitude) {
        this.currentAltitude = this.performance[i];

        if (i == this.performance.length - 1) {
          this.altitudeRatio = 1;
          break;
        }
        
        // percentage between currentAltitude and nextAltitude
        this.altitudeRatio = (altitude - this.currentAltitude.altitude) / 
        (this.performance[i + 1].altitude - this.currentAltitude.altitude);
        return;
      }
    }
  }

  // speed
  updateSpeed() {
    // fix minimal speed
    if (!this.speed || this.speed < this.currentAltitude.speed[0].speed) {
      this.speed = this.currentAltitude.speed[0].speed;
    }

    for (let i = this.currentAltitude.speed.length - 1; i >= 0; i--) {
      if (this.speed >= this.currentAltitude.speed[i].speed) {
        this.currentSpeed = this.currentAltitude.speed[i];

        if (i == this.currentAltitude.speed.length - 1) {
          
          break;
        }

        const nextLevelSpeed = this.currentAltitude.speed[i + 1]

        this.speed = this.currentSpeed.speed + (
          (nextLevelSpeed.speed - this.currentSpeed.speed) * 
          this.altitudeRatio
        );

        this.fuelConsumption = this.currentSpeed.fuelConsumption + (
          (nextLevelSpeed.fuelConsumption - this.currentSpeed.fuelConsumption) *
          this.altitudeRatio
        );
        return;
      }
    }
  }

  update() {

  }
}