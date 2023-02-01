import Aircraft from "@/unit/Aircraft/Aircraft";
import Unit from "@/unit/Unit";
import { ActionManager, Engine, Mesh, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import CamController from "./CamController";
import InputManager from "./InputManager";

// define game loop
export default class Core {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene | undefined;
  grid: Mesh;

  inputManager: InputManager;
  camera: CamController | undefined;

  constructor(canvas: HTMLCanvasElement, engine: Engine) {
    this.canvas = canvas;
    this.engine = engine;

    this.init();
  }

  init(): void {
    this.scene = new Scene(this.engine);
    this.scene.actionManager = new ActionManager();
    
    this.grid = MeshBuilder.CreatePlane("ground", {width: 10000, height: 10000}, this.scene);
    this.grid.position = new Vector3(0, 0, 0.5); // -926m
    this.grid.actionManager = new ActionManager(this.scene);

    this.inputManager = new InputManager(this);
    this.camera = new CamController(this);
  
    this.scene.debugLayer.show({
      embedMode: true
    });

    this.initRender();
  
    const jf_17 = new Aircraft(
      {
        callSign: "Tiger-1",
        name: "jf-17 block 2",
        sensors: [
          {type: "radar", data: {range1m2: 47, angle: 90, esa: false}}
        ]
      },this.scene, Vector3.Zero()
    );

    const j_20 = new Aircraft(
      {
        callSign: "Tiger-2",
        name: "j-20",
        sensors: [
          {type: "radar", data: {range1m2: 130, angle: 120, esa: true}}
        ]
      },this.scene, new Vector3(100, 0, 0)
    );
  }

  initRender() {
    this.engine.runRenderLoop(() => {
        this.scene.render();
    });
  }

  update(): void {
    //
  }
}