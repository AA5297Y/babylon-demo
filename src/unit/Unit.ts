import Core from "@/core/Core";
import { Scene, TransformNode, Vector3 } from "@babylonjs/core";
import UnitDTO from "./UnitDTO";

export default class Unit extends TransformNode {
  callSign: string;
  type: string;
  core: Core;
  side: string;

  attachedUi: TransformNode = null;

  constructor(unitDTO: UnitDTO, core: Core) {
    super(unitDTO.name, core.scene);

    this.callSign = unitDTO.callSign;
    this.core = core;
    this.side = unitDTO.side;
    this.position = unitDTO.position;

    this.attachedUi = new TransformNode("attachedUi", this.core.scene);
  }

  syncAttchedUi() {
    this.attachedUi.position = this.position;
    this.attachedUi.rotation = this.rotation;
  }

  testFriendlyOrFoe(): boolean {
    return this.core.side == this.side;
  }
}