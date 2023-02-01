import { Scene, Vector3 } from "@babylonjs/core";
import Sensor from "../../comps/sensors/Sensor";
import SensorDTO from "../../comps/sensors/SensorDTO";
import Irst from "../../comps/sensors/irst/Irst";
import IrstDTO from "../../comps/sensors/irst/IrstDTO";
import Radar from "../../comps/sensors/radar/Radar";
import RadarDTO from "../../comps/sensors/radar/RadarDTO";
import AircraftDTO from "./AircraftDTO";
import Unit from "../Unit";

export default class Aircraft extends Unit {
  aircraftDTO: AircraftDTO;

  sensors: Sensor[] = [];
  
  constructor(aircraftDTO: AircraftDTO, scene: Scene, position: Vector3) {
    super(aircraftDTO.callSign, scene, position);
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