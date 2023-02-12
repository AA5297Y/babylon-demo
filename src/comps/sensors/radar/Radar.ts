import Throttle from "@/core/tool/Throttle";
import Unit from "@/unit/Unit";
import { float, LinesMesh, Mesh, MeshBuilder, Quaternion, Scene, Vector2, Vector3 } from "@babylonjs/core";
import Sensor from "../Sensor";
import SensorDTO from "../SensorDTO";
import RadarDTO from "./RadarDTO";

export default class Radar extends Sensor {
  type = "radar";
  radarDTO: RadarDTO;

  alyUi: LinesMesh;
  foeUi: LinesMesh;

  // update
  enable = true;
  range5m2: number;
  guardRange: number;

  targetList: Unit[];

  constructor(sensorDTO: SensorDTO, parent: Unit) {
    super(sensorDTO, parent);

    this.radarDTO = <RadarDTO>sensorDTO.data;
  
    this.init();
  }

  // compute
  rcs2Range(rcs: float, angle: number = 0): float {
    return this.radarDTO.esa ? 
    (this.radarDTO.range1m2 * Math.pow(rcs, 1/4) * Math.cos(angle)) :
    (this.radarDTO.range1m2 * Math.pow(rcs, 1/4));
  }

  init() {
    this.range5m2 = this.rcs2Range(5);
    this.guardRange = this.rcs2Range(this.radarDTO.maxRcs);
    this.drawArc(this.radarDTO.defaultRcs);

    const throttledScaning = Throttle(this.scaning, this.refreshRate);
    // update
    this.update = (): void => {
      if (!this.passive && this.enable) {
        // ui update
        if (this.parent.testFriendlyOrFoe()) {
          this.updateAlyUi();
        } else {
          this.testUpdateFoeUi();
        }

        // scanning;
        throttledScaning(this);
      } else {
        this.disable();
      }
    }

    this.parent.core.scene.onBeforeRenderObservable.add(this.update);
  }

  // ui
  drawArc(targetRcs: number) {
    let pos: Vector3[] = [new Vector3(0, 0, 0)];
    let posSyn: Vector3[] = [];

    const range = this.rcs2Range(targetRcs);
    const unitAng = (this.radarDTO.angle / 36) * (Math.PI / 180)

    for (let i = 18; i >= 1; i--) {
      const ang = i * unitAng;

      let v2 = new Vector2(0, range);
      if (this.radarDTO.esa) {
        v2 = new Vector2(0, range * Math.cos(ang));
      }

      const rotatedV2 = Vector2.Zero();
      v2.rotateToRef(ang, rotatedV2);

      pos.push(new Vector3(rotatedV2.x, rotatedV2.y, 0))

      posSyn.unshift(new Vector3(-rotatedV2.x, rotatedV2.y, 0))
    }

    posSyn = [new Vector3(0, range, 0)].concat(posSyn);
    posSyn.push(new Vector3(0, 0, 0));

    pos = pos.concat(posSyn);
    pos.push(new Vector3(0, 0, 0));

    const line = {
      points: pos,
      updatable: true,
    };
    
    this.alyUi = MeshBuilder.CreateLines("aly", line, this.parent.core.scene);
    this.alyUi.parent = this.parent.attachedUi;
    this.alyUi.edgesWidth = 1;
    this.alyUi.outlineWidth = 0;

    this.foeUi = MeshBuilder.CreateDashedLines("foe", {...line, dashSize: 3, gapSize: 3, dashNb: 120}, this.parent.core.scene);
    this.foeUi.parent = this.parent.attachedUi;
    this.foeUi.edgesWidth = 1;
    this.foeUi.outlineWidth = 0;
  }

  // update aly ui
  updateAlyUi() {
    this.alyUi.isVisible = true;
    this.foeUi.isVisible = false;
  } 

  // update foe ui
  testUpdateFoeUi() {
    this.alyUi.isVisible = false;

    if (this.parent.classified) {
      this.foeUi.isVisible = true;
    } else {
      this.foeUi.isVisible = false;
    }
  }

  // radar pass
  disable() {
    if (!this.alyUi.isVisible && !this.foeUi.isVisible) {
      return;
    }

    this.alyUi.isVisible = false;
    this.foeUi.isVisible = false;
  }

  scaning() {
    this.targetList = [];

    this.parent.core.sides.forEach((value) => {
      if (value.id == this.parent.core.side) {
        return;
      }

      value.units.forEach((other) => {
        if (this.mesure(other)) {
          this.targetList.push(other);
        }
      })
    })
  }
  
  mesure(other: Unit): boolean {
    const distance = Vector3.Distance(this.parent.position, other.position);
    if (distance > this.guardRange) {
      return false;
    }

    const angle = this.getBearing(other);
    const absAngle = Math.abs(angle);

    if (absAngle > (this.radarDTO.angle / 2)) {
      return false;
    }

    const rcs = other.getRCSFrom(this.parent);

    const range = this.rcs2Range(rcs, absAngle);

    if (distance < range) {
      if (this.parent.testFriendlyOrFoe()) {
        other.markUnknow();
        other.beenDetected();
      }

      return true;
    }
  }

  getBearing(other: Unit) {
    return Vector3.GetAngleBetweenVectors(
      this.parent.up,
      other.position.subtract(this.parent.position),
      this.parent.forward.negate()
    ) / (Math.PI / 180);
  }
}