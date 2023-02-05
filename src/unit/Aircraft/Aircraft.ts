import { ActionManager, GUID, Scene, Vector3 } from "@babylonjs/core";
import AircraftDTO from "./AircraftDTO";
import Unit from "../Unit";
import Core from "@/core/Core";
import UnitDTO from "../UnitDTO";
import { Ellipse } from "@babylonjs/gui/2D/controls/ellipse";
import { Line } from "@babylonjs/gui/2D/controls/line";
import { Rectangle } from "@babylonjs/gui/2D/controls/rectangle";
import { Image } from "@babylonjs/gui/2D/controls/image";
import SpriteTool from "@/core/SpriteTool";
import Visibility from "../Visibility";

export default class Aircraft extends Unit {
  type = "aircraft";
  aircraftDTO: AircraftDTO;
  
  constructor(unitDTO: UnitDTO, core: Core) {
    super(unitDTO, core);
    this.aircraftDTO = unitDTO.data;
  }

  // override movement
  initMovement() {
    this.updateMovement = () => {
      if (this.target == null) {
        this.turnAround();
      } else {
        this.turning();
      }
  
      const forward = this.getForward();
      let x = this.position.x + forward.x * this.getSpeed();
      let y = this.position.y + forward.y * this.getSpeed();
      let z = this.position.z + forward.z * this.getSpeed();
  
      this.position.set(x, y, z);
    }

    this.core.scene.onBeforeRenderObservable.add(this.updateMovement);
  }

  updateMovement = (): void => {}

  turning(): void {
    //
  }

  turnAround(): void {
    const turnAroundAng = this.unitDTO.turnAroundRate * Math.PI / 180;
    this.rotation.z += turnAroundAng / 1000 * this.getEngine().getDeltaTime();
  }

  getForward(): Vector3 {
    return this.getDirection(new Vector3(0, 1, 0));
  }

  getSpeed(): number {
    // 480kt
    return (this.speedInKt / 3600) / 1000 * this.getEngine().getDeltaTime();
  }

  // initUi
  initUnitIcon() {
    this.unitIcon = new Image("unitIcon");
    SpriteTool.init(this.unitIcon);
    SpriteTool.unknowAir(this.unitIcon);
    this.core.fullScrGUI.addControl(this.unitIcon);
    this.unitIcon.linkWithMesh(this.attachedUi);

    this.updateUi = () => {
      if (this.testFriendlyOrFoe()) {
        this.unitIcon.isVisible = true;
        SpriteTool.alyAir(this.unitIcon);
      } else {
        switch (this.visibility) {
          case Visibility.invisible:
            this.unitIcon.isVisible = false;
            break;
          case Visibility.unknow:
            this.unitIcon.isVisible = true;
            SpriteTool.unknowAir(this.unitIcon);
            break;
          case Visibility.friendly:
            this.unitIcon.isVisible = true;
            SpriteTool.friendlyAir(this.unitIcon);
            break;
          case Visibility.ally:
            this.unitIcon.isVisible = true;
            SpriteTool.alyAir(this.unitIcon);
            break;
          case Visibility.unfriendly:
            this.unitIcon.isVisible = true;
            SpriteTool.unFriendlyAir(this.unitIcon);
            break;
          case Visibility.enemy:
            this.unitIcon.isVisible = true;
            SpriteTool.enemeyAir(this.unitIcon);
            break;
        }
      }
    }

    this.core.scene.onBeforeRenderObservable.add(this.updateUi);
  }
}