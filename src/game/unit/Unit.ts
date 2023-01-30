import { Scene, TransformNode } from "@babylonjs/core";

export default class Unit extends TransformNode {
  scene: Scene;

  constructor(name: string, scene: Scene) {
    super(name, scene);

    this.scene = scene;
  }
}