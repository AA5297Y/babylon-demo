import { Camera, Engine, Scene, Vector3 } from "@babylonjs/core";
import Aircraft from "@/game/unit/Aircraft/Aircraft";
import Core from "./core/Core";

export default class Game {
  constructor() {
    const containerDiv = document.getElementById("gameViewer");

    if (containerDiv == null) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "canvas";
    
    containerDiv.append(canvas);

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const core = new Core(canvas, scene);

    engine.runRenderLoop(() => {
      core.update();

      scene.render();
    });
    
    window.addEventListener('resize', () => {
      engine.resize();
    });

    window.addEventListener('load', () => {
      engine.resize();
    })
  }
}