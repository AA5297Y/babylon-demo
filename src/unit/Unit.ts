import { Scene, TransformNode, Vector3 } from "@babylonjs/core";

export default class Unit extends TransformNode {
  scene: Scene;

  constructor(name: string, scene: Scene, position: Vector3) {
    super(name, scene);

    this.scene = scene;
    this.position = position;
  }
}