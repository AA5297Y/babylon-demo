import { Camera, Engine, Scene, Vector3 } from "@babylonjs/core";
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

    const engine = new Engine(canvas, true);
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