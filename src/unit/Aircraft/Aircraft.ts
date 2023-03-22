import { Vector3 } from "@babylonjs/core";
import AircraftDTO from "./AircraftDTO";
import Unit from "../Unit";
import Core from "@/core/Core";
import * as UnitDTO from "../UnitDTO";
import { Image } from "@babylonjs/gui/2D/controls/image";
import SpriteTool from "@/core/tool/SpriteTool";
import Visibility from "../Visibility";
import Side from "@/core/side/Side";

export default class Aircraft extends Unit {
  type = UnitDTO.TYPE.aircraft;
  aircraftDTO: AircraftDTO;
  
  constructor(unitDTO: UnitDTO.UnitDTO, core: Core, side: Side) {
    super(unitDTO, core, side);
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
      const speed = this.getSpeed();

      let x = this.position.x + forward.x * speed;
      let y = this.position.y + forward.y * speed;
      let z = this.position.z + forward.z * speed;
  
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
    let speed = 0;
    this.propulsions.forEach((value) => {
      if (value.enable) {
        this.logger.text = "speed: " + value.speed + "\n" +
        "altitude: " + value.altitude + "\n" + 
        "fuelCons: " + value.fuelConsumption;

        speed = (value.speed / 3600) / 1000 * this.getEngine().getDeltaTime();
        return;
      }
    });

    return speed;
  }

  // initUi
  initUnitIcon() {
    this.unitIcon = new Image("unitIcon");
    SpriteTool.init(this.unitIcon);
    SpriteTool.unknowAir(this.unitIcon);
    this.core.fullScrGUI.addControl(this.unitIcon);
    this.unitIcon.linkWithMesh(this.attachedUi);

    this.updateUi = () => {
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

    this.core.scene.onBeforeRenderObservable.add(this.updateUi);
  }
}