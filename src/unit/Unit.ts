import Comm from "@/comps/comms/comm/Comm";
import CommDTO from "@/comps/comms/comm/CommDTO";
import Comms from "@/comps/comms/Comms";
import * as CommsDTO from "@/comps/comms/CommsDTO";
import AviationFuelTank from "@/comps/fuelTank/airFuelTank/AviationFuelTank";
import FuelTank from "@/comps/fuelTank/FuelTank";
import * as FuelTankDTO from "@/comps/fuelTank/FuelTankDTO";
import JetEngine from "@/comps/propulsions/jetEngine/JetEngine";
import Propulsion from "@/comps/propulsions/Propulsion";
import * as PropulsionDTO from "@/comps/propulsions/PropulsionDTO";
import Irst from "@/comps/sensors/irst/Irst";
import Radar from "@/comps/sensors/radar/Radar";
import Sensor from "@/comps/sensors/Sensor";
import * as SensorDTO from "@/comps/sensors/SensorDTO";
import Signal from "@/comps/signals/Signal";
import { SignalDTO } from "@/comps/signals/SignalDTO";
import Core from "@/core/Core";
import Side from "@/core/side/Side";
import { TransformNode, Vector3 } from "@babylonjs/core";
import { Control } from "@babylonjs/gui/2D/controls/control";
import { Image } from "@babylonjs/gui/2D/controls/image";
import { TextBlock, TextWrapping } from "@babylonjs/gui/2D/controls/textBlock";
import * as UnitDTO from "./UnitDTO";
import Visibility from "./Visibility";

export default class Unit extends TransformNode {
  attachedUi: TransformNode = null;

  callSign: String;
  type: UnitDTO.TYPE;
  unitDTO: UnitDTO.UnitDTO;
  core: Core;
  side: Side;

  // sensors
  sensors: Sensor[] = [];
  spotedTargets: Unit[];

  // comms
  comms: Comms[] = [];
  lostComm: boolean = true;

  // signals
  signals: Signal[] = [];
  visual: SignalDTO = {type: '', forward: 0.0, side: 0.0, rear: 0.0};
  rcs: SignalDTO = {type: '', forward: 0.0, side: 0.0, rear: 0.0};

  // all type fuelTanks
  fuelTanks: {
    aviationFuel: FuelTank[],
  } = {
    aviationFuel: [],
  };

  // propulsions
  propulsions: Propulsion[] = [];
  target: Vector3 = null;
  targetAltitude: number;
  targetSpeed: number;

  // icon
  unitIcon: Image = null;

  // visibility
  visibility: Visibility = Visibility.invisible;
  classified: boolean = false;
  LTBDCounter: TextBlock;
  LTBDCUpdated: boolean = false;
  LTBDC: number = 0;
  LTBDCTimeInterval: NodeJS.Timeout;

  // logger
  logger: TextBlock;

  constructor(unitDTO: UnitDTO.UnitDTO, core: Core, side: Side) {
    super(unitDTO.name.toString(), core.scene);
    this.callSign = unitDTO.callSign;
    this.unitDTO = unitDTO;
    this.core = core;
    this.side = side;
    this.position = unitDTO.position;

    this.attachedUi = new TransformNode("attachedUi", this.core.scene);

    this.init();
  }
  
  init():void {
    this.initSensors();
    this.initComms();
    this.initSignals();
    this.initFuelTanks();
    this.initProPulsions();
    this.initMovement();
    this.initUi();

    if (this.core.logMode) {
      this.initLogger();
    }

    this.syncAttchedUi();
  }

  // sensor
  initSensors(): void {
    this.unitDTO.sensors.forEach((value) => {
      switch (value.type) {
        case SensorDTO.TYPE.radar:
          this.sensors.push(new Radar(value, this));
          break;
        case SensorDTO.TYPE.irst:
          this.sensors.push(new Irst(value, this))
          break;
      }
    })
  }

  // comms
  initComms() {
    this.unitDTO.comms.forEach((value) => {
      switch (value.type) {
        case CommsDTO.TYPE.comm:
          this.comms.push(new Comm(<CommDTO>value.data, this));
          break;
      }
    })

    this.resetComm();

    this.updateComm = () => {
      if (!this.lostComm && this.testFriendlyOrFoe()) {
        this.visibility = Visibility.ally;
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
  initSignals() {
    this.unitDTO.signals.forEach((value) => {
      switch (value.type) {
        case "rcs":
          this.signals.push(new Signal(value));
          break;
        case "visual":
          this.signals.push(new Signal(value));
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

  // fuelTanks
  initFuelTanks() {
    this.unitDTO.fuelTanks.forEach((value) => {
      switch (value.type) {
        case FuelTankDTO.TYPE.aviationFuel:
          if (value.detachable) {
            this.fuelTanks.aviationFuel.unshift(new AviationFuelTank(value));
          } else {
            this.fuelTanks.aviationFuel.push(new AviationFuelTank(value));
          }
          break;
        // case FuelTankDTO.TYPE.rocket:
        //   if (value.detachable) {
        //     this.fuelTanks.aviationFuel.unshift(new AviationFuelTank(value));
        //   } else {
        //     this.fuelTanks.aviationFuel.push(new AviationFuelTank(value));
        //   }
        //   break;
      }
    })
  }

  // movement
  initProPulsions() {
    // init engine
    this.unitDTO.propulsions.forEach((value) => {
      switch (value.type) {
        case PropulsionDTO.TYPE.jetEngine:
          this.propulsions.push(new JetEngine(value.data, this));
          break;
      }
    })
  
    // attach fueltanks to engines


    // enable first engine
    this.propulsions[0].enable = true;
  }
  
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
    this.initLastTimeBeenDetectedCounter();
    this.initLogger();
  }

  initUnitIcon() {
    // 
  }

  updateUi = () => {}

  // visibility
  testFriendlyOrFoe(): boolean {
    return this.core.side == this.side.id;
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

  initLastTimeBeenDetectedCounter() {
    this.LTBDCounter = new TextBlock("LTBD");
    this.LTBDCounter.width = "24px";
    this.LTBDCounter.height = "12px";
    this.LTBDCounter.fontSize = "12px";
    this.LTBDCounter.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.LTBDCounter.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.LTBDCounter.color = "white";

    this.core.fullScrGUI.addControl(this.LTBDCounter);
    this.LTBDCounter.linkOffsetY = 18;
    this.LTBDCounter.linkWithMesh(this.attachedUi);

    this.LTBDCounter.isVisible = false;

    this.lastTimeBeenDetectedTimer();
  }

  lastTimeBeenDetectedTimer() {
    if (this.LTBDCUpdated) {
      this.LTBDCUpdated = false;
      clearTimeout(this.LTBDCTimeInterval);
      this.LTBDC = 0;
      this.lastTimeBeenDetectedTimer();
      return;
    }

    this.LTBDC++;
    this.LTBDCounter.text = this.LTBDC + "s";

    this.LTBDCTimeInterval = setTimeout(() => {
      this.lastTimeBeenDetectedTimer();
    }, 1000);
  }

  beenDetected() {
    this.LTBDCUpdated = true;
    this.LTBDCounter.isVisible = true;
    this.syncAttchedUi();
  }

  // logger
  initLogger() {
    this.logger = new TextBlock("logger");
    this.logger.width = "120px";
    this.logger.height = "120px";
    this.logger.fontSize = "12px";
    this.logger.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT
    this.logger.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.logger.textWrapping = TextWrapping.WordWrap;

    this.logger.color = "white";
    this.logger.outlineColor = "white";

    this.core.fullScrGUI.addControl(this.logger);
    this.logger.linkOffsetX = 80;
    this.logger.linkOffsetY = 50;
    this.logger.linkWithMesh(this.attachedUi);

    this.logger.isVisible = true;
  }

  syncAttchedUi() {
    this.attachedUi.position.x = this.position.x;
    this.attachedUi.position.y = this.position.y;
    this.attachedUi.position.z = this.position.z;

    this.attachedUi.rotation.x = this.rotation.x;
    this.attachedUi.rotation.y = this.rotation.y;
    this.attachedUi.rotation.z = this.rotation.z;
  }
}