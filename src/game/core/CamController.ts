import { Camera, Scene, Vector3 } from "@babylonjs/core";

export default class CamController {
  scene: Scene;

  constructor(canvas: HTMLCanvasElement, scene: Scene) {
    this.scene = scene;

    const camera = new Camera("player", new Vector3(0, 0, -100), this.scene);
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
    camera.attachControl(canvas);
    camera.minZ = 0;
    camera.maxZ = 1000;
  }
}