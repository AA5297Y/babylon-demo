import { Scene, Vector3 } from "@babylonjs/core";
import Sensor from "../../comps/sensors/Sensor";
import SensorDTO from "../../comps/sensors/SensorDTO";
import Irst from "../../comps/sensors/irst/Irst";
import IrstDTO from "../../comps/sensors/irst/IrstDTO";
import Radar from "../../comps/sensors/radar/Radar";
import RadarDTO from "../../comps/sensors/radar/RadarDTO";
import AircraftDTO from "./AircraftDTO";
import Unit from "../Unit";
import Core from "@/core/Core";
import UnitDTO from "../UnitDTO";

export default class Aircraft extends Unit {
  type = "aircraft";
  aircraftDTO: AircraftDTO;

  sensors: Sensor[] = [];

  target: Vector3 = null;
  speedInKt: number = 480;
  
  constructor(unitDTO: UnitDTO, core: Core) {
    super(unitDTO, core);
    this.aircraftDTO = unitDTO.data;
    this.core = core;

    this.init();
  }

  init():void {
    this.initSensor(this.aircraftDTO.sensors);

    this.initMovement();
  }

  // sensor
  initSensor(sensorsDTO: SensorDTO[]): void {
    sensorsDTO.forEach((value) => {
      switch (value.type) {
        case "radar":
          this.sensors.push(new Radar(<RadarDTO>value.data, this, this.core.scene));
          break;
        case "irst":
          this.sensors.push(new Irst(<IrstDTO>value.data, this, this.core.scene))
          break;
      }
    })
  }

  // movement
  initMovement() {
    this.core.scene.onBeforeRenderObservable.add(() => {this.updateMovement()});
  }

  updateMovement() {
    if (this.target == null) {
      this.turnAround();
    } else {
      this.turning();
    }

    const forward = this.getForward();
    let x = this.position.x + forward.x * this.getSpeed();
    let y = this.position.y + forward.y * this.getSpeed();
    let z = this.position.z + forward.z * this.getSpeed();

    this.position.set(x, y, z);
  }

  turning(): void {
    //
  }

  turnAround(): void {
    const turnAroundAng = this.aircraftDTO.turnAroundRate * Math.PI / 180;
    this.rotation.z += turnAroundAng / 1000 * this.getEngine().getDeltaTime();
  }

  getForward(): Vector3 {
    return this.getDirection(new Vector3(0, 1, 0));
  }

  getSpeed(): number {
    // 480kt
    return (this.speedInKt / 3600) / 1000 * this.getEngine().getDeltaTime();
  }
}