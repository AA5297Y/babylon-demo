import Comm from "@/comps/comms/comm/Comm";
import CommDTO from "@/comps/comms/comm/CommDTO";
import Comms from "@/comps/comms/Comms";
import Irst from "@/comps/sensors/irst/Irst";
import IrstDTO from "@/comps/sensors/Irst/IrstDTO";
import Radar from "@/comps/sensors/radar/Radar";
import RadarDTO from "@/comps/sensors/radar/RadarDTO";
import Sensor from "@/comps/sensors/Sensor";
import Core from "@/core/Core";
import { Scene, TransformNode, Vector3 } from "@babylonjs/core";
import UnitDTO from "./UnitDTO";

export default class Unit extends TransformNode {
  attachedUi: TransformNode = null;
  attachedUiFixedRotation: TransformNode = null;

  callSign: string;
  type: string;
  unitDTO: UnitDTO;
  core: Core;
  side: string;

  // sensors
  sensors: Sensor[] = [];
  // comms
  comms: Comms[] = [];
  lostComm: boolean = true;

  // movement
  target: Vector3 = null;
  speedInKt: number = 480;

  constructor(unitDTO: UnitDTO, core: Core) {
    super(unitDTO.name, core.scene);
    this.callSign = unitDTO.callSign;
    this.unitDTO = unitDTO;
    this.core = core;
    this.side = unitDTO.side;
    this.position = unitDTO.position;

    this.attachedUi = new TransformNode("attachedUi", this.core.scene);
    this.attachedUiFixedRotation = new TransformNode("attachedUiFixedRotation", this.core.scene);

    this.init();
  }
  
  init():void {
    this.initSensors();
    this.initComms();
    this.initMovement();
  }

  syncAttchedUi() {
    this.attachedUi.position.x = this.position.x;
    this.attachedUi.position.y = this.position.y;
    this.attachedUi.position.z = this.position.z;

    this.attachedUi.rotation.x = this.rotation.x;
    this.attachedUi.rotation.y = this.rotation.y;
    this.attachedUi.rotation.z = this.rotation.z;

    // fixed rotation
    this.attachedUiFixedRotation.position.x = this.position.x;
    this.attachedUiFixedRotation.position.y = this.position.y;
    this.attachedUiFixedRotation.position.z = this.position.z;
  }

  testFriendlyOrFoe(): boolean {
    return this.core.side == this.side;
  }

  
  // sensor
  initSensors(): void {
    this.unitDTO.sensors.forEach((value) => {
      switch (value.type) {
        case "radar":
          this.sensors.push(new Radar(<RadarDTO>value.data, this));
          break;
        case "irst":
          this.sensors.push(new Irst(<IrstDTO>value.data, this))
          break;
      }
    })
  }

  // comms
  initComms() {
    this.unitDTO.comms.forEach((value) => {
      switch (value.type) {
        case "comm":
          this.comms.push(new Comm(<CommDTO>value.data, this));
          break;
      }
    })

    this.resetComm();

    this.core.scene.onBeforeRenderObservable.add(() => {this.updateComm()})
  }

  resetComm() {
    this.lostComm = true;

    this.comms.forEach((value) => {
      if (value.type == "comm" && value.available) {
        this.lostComm = false;
      }
    })
  }

  updateComm() {
    if (!this.lostComm) {
      this.syncAttchedUi();
    }
  }

  // movement
  initMovement() {
    // base class is static
  }
}