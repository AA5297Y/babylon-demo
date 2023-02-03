import { Scene, TransformNode, Vector3 } from "@babylonjs/core";

export default class Unit extends TransformNode {
  callSign: String;
  scene: Scene;

  constructor(name: string, scene: Scene) {
    super(name, scene);
    this.callSign = name;
    this.scene = scene;
  }
}