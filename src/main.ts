import { WebGPUEngine } from "@babylonjs/core";
import Core from "./core/Core";
import '@babylonjs/inspector';

import './scss/ui.scss';
import 'font-awesome/css/font-awesome.min.css';

class Main {
  constructor() {
    // prevent default contextmenu
    window.document.addEventListener("contextmenu", (ev) => {
      ev.preventDefault();
    })

    const main = document.getElementById("main");

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "canvas";
    
    main.append(canvas);

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