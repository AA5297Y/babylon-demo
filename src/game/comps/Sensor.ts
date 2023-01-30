import { Scene } from "@babylonjs/core";
import Unit from "../unit/Unit";
import Component from "./Component";

export default class Sensor extends Component {
  scene: Scene;

  constructor(parent: Unit, scene: Scene) {
    super(parent);
    this.scene = scene;
  }

  update(): void {
    return
  }
}