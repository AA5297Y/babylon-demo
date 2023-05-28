import NewScenario from "@/scenario/NewScenario";
import Unit from "@/unit/Unit";
import { ActionManager, Color3, Engine, Material, Mesh, MeshBuilder, Scene, StandardMaterial, Vector2, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import CamController from "./CamController";
import ContactManager from "./ContactManager";
import InputManager from "./InputManager";
import ScenarioReader from "./ScenarioReader";
import Side from "./side/Side";
import View from "./View";

// define game loop
enum SelectMode {
  aly = 'aly',
  other = 'other',
}

export default class Core {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene | undefined;

  // view
  view: View;

  pause: boolean = false;
  autoPause: boolean = false;

  // ground(raycast area)
  grid: Mesh;
  fullScrGUI: AdvancedDynamicTexture;
  side: number;

  // log mode
  logMode: boolean = true;

  // managers
  inputManager: InputManager;
  cameraControl: CamController;
  contactManager: ContactManager;

  // scenario data
  scenarioReader: ScenarioReader = null;
  sides: Side[] = [];

  // selection
  selectRadius: number = 5;
  rdySelection: Unit[] = [];

  selection: Unit[] = [];
  selectTargetMode = false;
  selectMode: SelectMode = null;
  selectedTarget: Unit = null;

  constructor(canvas: HTMLCanvasElement, engine: Engine) {
    this.canvas = canvas;
    this.engine = engine;

    this.init();
  }

  init(): void {
    window.addEventListener('blur', () => {
      this.gameAutoPause();
    })
    window.addEventListener('focus', () => {
      this.gameAutoUnpause();
    })

    this.scene = new Scene(this.engine);
    this.scene.actionManager = new ActionManager();

    this.initGround();
    this.initFullScrGUI();

    this.inputManager = new InputManager(this);
    this.cameraControl = new CamController(this);
    this.contactManager = new ContactManager(this);

    this.initRender();
    this.initView();

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

  // view
  initView() {
    this.view = new View(this);
  }

  // pause
  gamePaused() {
    return this.pause || this.autoPause;
  }

  gameAutoPause() {
    this.autoPause = true;

    if (!this.pause) {
      this.gamePause();
    }
  }

  gameAutoUnpause() {
    this.autoPause = false;

    if (!this.pause) {
      this.gameUnpause();
    }
  }

  gamePauseSw() {
    if (this.pause) {
      this.pause = false;
      this.gameUnpause();
    } else {
      this.pause = true;
      this.gamePause();
    }
  }

  gamePause() {
    this.view.viewPause();
  }

  gameUnpause() {
    this.view.viewUnpause();
  }

  // initFullScrGUI
  initFullScrGUI() {
    this.fullScrGUI = AdvancedDynamicTexture.CreateFullscreenUI("GUI layer");
  }

  // scenario read
  testScenarioReader() {
    this.scenarioReader = new ScenarioReader(this, NewScenario);
  }


  // selection
  select(vector: Vector3, scrVector: Vector2, shift: boolean = false) {
    this.rdySelection = [];

    if (this.selectMode == null) {
      this.sides.forEach((side) => {
        side.units.forEach((unit) => {
          if (Vector3.Distance(new Vector3(unit.position.x, unit.position.y, 0), vector) <= this.selectRadius) {
            this.rdySelection.push(unit);
          }
        })
      })
      
      this.singleSelect(scrVector, shift);

      return
    }

    if (this.selectMode == SelectMode.aly) {
      
    } else if (this.selectMode == SelectMode.other) {

    }

  }

  clearSelection() {
    this.selection = [];
  }

  singleSelect(scrVector: Vector2, shift: boolean) {
    // if (rdySelection.length == 0) {
    //   this.setSelection(null, shift);
    //   return;
    // }

    // if (rdySelection.length <= 1) {
    //   this.setSelection(rdySelection[0], shift);
    //   return;
    // }

    this.view.setSelectList(this.rdySelection, scrVector, shift);
  }

  setSelection(unit: Unit, shift: boolean) {
    if (unit == null) {
      if (!shift) {
        this.clearSelection();
        return;
      }
      return;
    }

    if (!shift) {
      this.selection = [unit];
      console.log(this.selection);
      return;
    }

    let index = this.selection.indexOf(unit);
    
    if (index > -1) {
      this.selection.splice(index, 1);
    } else {
      this.selection.push(unit);
    }

    console.log(this.selection);
  }

  // contextmenu
  showUnitContextMenu() {
    console.log(this.selection[0]);
  }
}