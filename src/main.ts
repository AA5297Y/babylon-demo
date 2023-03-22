import { Camera, Engine, Scene, Vector3, WebGPUEngine } from "@babylonjs/core";
import Core from "./core/Core";
import '@babylonjs/inspector';

class Main {
  constructor() {
    const containerDiv = document.body;

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "canvas";
    
    containerDiv.append(canvas);

    this.initEngine(canvas);
  }

  async initEngine(canvas: HTMLCanvasElement) {
    // const engine = new Engine(canvas);

    // webGPU
    const engine = new WebGPUEngine(canvas);
    await engine.initAsync();

    const core = new Core(canvas, engine);
        
    window.addEventListener('resize', () => {
      engine.resize();
    });

    window.addEventListener('load', () => {
      engine.resize();
    })
  }
}

export default new Main();