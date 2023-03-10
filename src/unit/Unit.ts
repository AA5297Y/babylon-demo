import Comm from "@/comps/comms/comm/Comm";
import CommDTO from "@/comps/comms/comm/CommDTO";
import Comms from "@/comps/comms/Comms";
import Irst from "@/comps/sensors/irst/Irst";
import Radar from "@/comps/sensors/radar/Radar";
import Sensor from "@/comps/sensors/Sensor";
import RCS from "@/comps/signals/rcs/RCS";
import Signal from "@/comps/signals/Signal";
import SignalDTO from "@/comps/signals/SignalDTO";
import Visual from "@/comps/signals/visual/Visual";
import Core from "@/core/Core";
import { TransformNode, Vector3 } from "@babylonjs/core";
import { Image } from "@babylonjs/gui/2D/controls/image";
import UnitDTO from "./UnitDTO";
import Visibility from "./Visibility";

export default class Unit extends TransformNode {
  attachedUi: TransformNode = null;

  callSign: string;
  type: string;
  unitDTO: UnitDTO;
  core: Core;
  sideId: number;

  // sensors
  sensors: Sensor[] = [];

  // comms
  comms: Comms[] = [];
  lostComm: boolean = true;

  // signals
  signals: Signal[] = [];
  visual: SignalDTO = {type: '', forward: 0.0, side: 0.0, rear: 0.0};
  rcs: SignalDTO = {type: '', forward: 0.0, side: 0.0, rear: 0.0};

  // movement
  target: Vector3 = null;
  speedInKt: number = 480;

  // icon
  unitIcon: Image = null;

  // visibility
  visibility: Visibility = Visibility.invisible;
  classified: boolean = false;

  constructor(unitDTO: UnitDTO, core: Core, sideId: number) {
    super(unitDTO.name, core.scene);
    this.callSign = unitDTO.callSign;
    this.unitDTO = unitDTO;
    this.core = core;
    this.sideId = sideId;
    this.position = unitDTO.position;

    this.attachedUi = new TransformNode("attachedUi", this.core.scene);

    this.init();
  }
  
  init():void {
    this.initSensors();
    this.initComms();
    this.initSignal();
    this.initMovement();
    this.initUi();

    this.syncAttchedUi();
  }

  syncAttchedUi() {
    this.attachedUi.position.x = this.position.x;
    this.attachedUi.position.y = this.position.y;
    this.attachedUi.position.z = this.position.z;

    this.attachedUi.rotation.x = this.rotation.x;
    this.attachedUi.rotation.y = this.rotation.y;
    this.attachedUi.rotation.z = this.rotation.z;
  }

  // sensor
  initSensors(): void {
    this.unitDTO.sensors.forEach((value) => {
      switch (value.type) {
        case "radar":
          this.sensors.push(new Radar(value, this));
          break;
        case "irst":
          this.sensors.push(new Irst(value, this))
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

    this.updateComm = () => {
      if (!this.lostComm && this.testFriendlyOrFoe()) {
        this.syncAttchedUi();
      }
    }

    this.core.scene.onBeforeRenderObservable.add(this.updateComm)
  }

  resetComm() {
    this.lostComm = true;

    this.comms.forEach((value) => {
      if (value.type == "comm" && value.available) {
        this.lostComm = false;
      }
    })
  }

  updateComm = (): void => {}

  // Signal
  initSignal() {
    this.unitDTO.signals.forEach((value) => {
      switch (value.type) {
        case "rcs":
          this.signals.push(new Signal(<RCS>value));
          break;
        case "visual":
          this.signals.push(new Signal(<Visual>value));
          break;
      }
    })

    this.updateRcs();
    this.updateVisual();
  }

  updateRcs() {
    this.unitDTO.signals.forEach((value) => {
      if (value.type == "rcs") {
        this.rcs.forward = value.forward;
        this.rcs.side = value.side;
        this.rcs.rear = value.rear;
      }
    })
  }

  updateVisual() {

  }
  
  getRCSFrom(other: Unit): number {
    const absAngle = Math.abs(this.getTargetBearing(other));

    if (absAngle >= 120) {
      return this.rcs.rear;
    } else if (absAngle >= 60) {
      return this.rcs.side;
    } else {
      return this.rcs.forward;
    }
  }

  // movement
  initMovement() {
    // base class is static
  }

  getTargetBearing(other: Unit) {
    return Vector3.GetAngleBetweenVectors(
      this.up,
      other.position.subtract(this.position),
      this.forward.negate()
    ) / (Math.PI / 180);
  }

  // initUi
  initUi() {
    this.initUnitIcon();
  }

  initUnitIcon() {
    // 
  }

  updateUi = () => {}

  // visibility
  testFriendlyOrFoe(): boolean {
    return this.core.side == this.sideId;
  }

  markInvisible() {
    this.visibility = Visibility.invisible;
  }

  markUnknow() {
    this.visibility = Visibility.unknow;
  }

  markFriendly() {
    this.visibility = Visibility.friendly;
  }

  markAlly() {
    this.visibility = Visibility.ally;
  }

  markUnfriendly() {
    this.visibility = Visibility.unfriendly;
  }

  markEnemy() {
    this.visibility = Visibility.enemy;
  }


}