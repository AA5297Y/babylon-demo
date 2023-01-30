import { Scene } from "@babylonjs/core";
import Sensor from "../comps/Sensor";
import SensorDTO from "../comps/SensorDTO";
import Irst from "../comps/sensors/Irst";
import IrstDTO from "../comps/sensors/IrstDTO";
import Radar from "../comps/sensors/Radar";
import RadarDTO from "../comps/sensors/RadarDTO";
import AircraftDTO from "./AircraftDTO";
import Unit from "./Unit";

export default class Aircraft extends Unit {
  aircraftDTO: AircraftDTO;

  sensors: Sensor[] = [];
  
  constructor(aircraftDTO: AircraftDTO, scene: Scene) {
    super(aircraftDTO.callSign, scene);
    this.aircraftDTO = aircraftDTO;
    this.scene = scene;

    this.init();
  }

  init():void {
    this.initSensor(this.aircraftDTO.sensors);
  }

  initSensor(sensorsDTO: SensorDTO[]): void {
    sensorsDTO.forEach((value) => {
      switch (value.type) {
        case "radar":
          this.sensors.push(new Radar(<RadarDTO>value.data, this, this.scene));
          break;
        case "irst":
          this.sensors.push(new Irst(<IrstDTO>value.data, this, this.scene))
          break;
      }
    })
  }
}