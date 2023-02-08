import NewScenario from "@/scenario/NewScenario";
import Unit from "@/unit/Unit";
import { ActionManager, Color3, Engine, Material, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import CamController from "./CamController";
import ContactManager from "./ContactManager";
import InputManager from "./InputManager";
import ScenarioReader from "./ScenarioReader";
import Side from "./side/Side";

// define game loop
export default class Core {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene | undefined;
  // ground(raycast area)
  grid: Mesh;
  fullScrGUI: AdvancedDynamicTexture;
  side: number;

  inputManager: InputManager;
  cameraControl: CamController;
  contactManager: ContactManager;

  // scenario data
  scenarioReader: ScenarioReader = null;
  sides: Side[] = [];

  constructor(canvas: HTMLCanvasElement, engine: Engine) {
    this.canvas = canvas;
    this.engine = engine;

    this.init();
  }

  init(): void {
    this.scene = new Scene(this.engine);
    this.scene.actionManager = new ActionManager();

    this.initGround();
    this.initFullScrGUI();

    this.inputManager = new InputManager(this);
    this.cameraControl = new CamController(this);
    this.contactManager = new ContactManager(this);

    this.initRender();

    this.testScenarioReader()
  }
  
  /*
  1ft = 0.000165nm
  1ft = 0.3048m
  */
  initGround() {
    this.grid = MeshBuilder.CreatePlane("ground", {width: 10000, height: 10000}, this.scene);
    this.grid.position = new Vector3(0, 0, 0.323974); // -600m
    this.grid.actionManager = new ActionManager(this.scene);

    const gridMaterial = new StandardMaterial("grid");
    gridMaterial.emissiveColor = Color3.FromHexString("#33334c");
    this.grid.material = gridMaterial;
  }

  initRender() {
    this.scene.debugLayer.show({
      embedMode: true
    });

    this.engine.runRenderLoop(() => {
        this.scene.render();
    });
  }

  // initFullScrGUI
  initFullScrGUI() {
    this.fullScrGUI = AdvancedDynamicTexture.CreateFullscreenUI("GUI layer");
  }

  // scenario read
  testScenarioReader() {
    this.scenarioReader = new ScenarioReader(this, NewScenario);
  }
}