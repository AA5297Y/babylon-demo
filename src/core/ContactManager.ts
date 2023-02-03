import Radar from "@/comps/sensors/radar/Radar";
import Sensor from "@/comps/sensors/Sensor";
import Aircraft from "@/unit/Aircraft/Aircraft";
import { LinesMesh, Mesh, MeshBuilder, Vector2, Vector3 } from "@babylonjs/core";
import Core from "./Core";

export default class ContactManager {
  core: Core;

  constructor(core: Core) {
    this.core = core;
    
    this.init();
  }

  init() {
    this.core.scene.onBeforeRenderObservable.add(() => {this.updateAlyContact()})
  }

  updateAlyContact() {
    this.core.units.forEach((value) => {
      value.syncAttchedUi();
    })
  }
}