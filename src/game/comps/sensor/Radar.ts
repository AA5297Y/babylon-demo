import { float, MeshBuilder, Scene, Vector2, Vector3 } from "@babylonjs/core";
import RadarDTO from "./RadarDTO";

export default class Radar {
  radarDTO: RadarDTO;
  scene: Scene;

  constructor(radarDTO: RadarDTO, scene: Scene) {
    this.radarDTO = radarDTO;
    this.scene = scene;

    this.ui();
  }

  // compute
  rcs2Range(rcs: float): float {
    return this.radarDTO.range1m2 * Math.pow(rcs, 1/4);
  }

  // ui
  ui(): void {
    this.draw50m2();
    this.draw5m2();
  }

  draw50m2(): void {
    const range50m2 = this.rcs2Range(50);

    this.drawArc(range50m2);
  }

  draw5m2(): void {
    const range5m2 = this.rcs2Range(5);

    this.drawArc(range5m2);
  }

  drawArc(range: float): void {
    let pos: Vector3[] = [new Vector3(0, 0, 0)];

    let posSyn: Vector3[] = [];

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
    
    MeshBuilder.CreateLines("lines", line, this.scene);
  }
}