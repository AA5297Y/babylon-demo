import { Scene } from "@babylonjs/core";
import CamController from "./CamController";

// define game loop
export default class Core {
  canvas: HTMLCanvasElement;
  scene: Scene;

  camera: CamController | undefined;

  constructor(canvas: HTMLCanvasElement, scene: Scene) {
    this.scene = scene;
    this.canvas = canvas;

    this.init();
  }

  init(): void {
    this.camera = new CamController(this.canvas, this.scene);
  }

  update(): void {
    //
  }
}