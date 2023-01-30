import { Camera, Engine, GamepadCamera, Scene, Vector3 } from "@babylonjs/core";
import Radar from "./comps/sensor/Radar";
import RadarDTO from "./comps/sensor/RadarDTO";

export default class Core {
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

    const engine = new Engine(canvas, false);

    const scene = new Scene(engine);
    const camera = new Camera("player", new Vector3(0, 0, -100), scene);
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
    camera.attachControl(canvas);
    camera.minZ = 0;
    camera.maxZ = 1000;

    // test radar
    const radar = new Radar({range1m2: 60, angle: 120, esa: true}, scene);

    engine.runRenderLoop(() => {
      scene.render();
    });
    
    window.addEventListener('resize', () => {
      engine.resize();
    });
  }
}