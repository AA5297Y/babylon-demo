import { Camera, MeshBuilder, UniversalCamera, Vector3 } from "@babylonjs/core";
import Core from "./Core";

export default class CamController {
  core: Core;
  camera: Camera;
  minZ = 20;
  maxZ = 9000;

  constructor(core: Core) {
    this.core = core;

    this.camera = new UniversalCamera("player", new Vector3(0, 0, -200), this.core.scene);
    // this.camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
    this.camera.fov = 1;
    this.camera.minZ = 0;
    this.camera.maxZ = 10000;

    this.initCamControl();
  }

  initCamControl() {
    this.camera.detachControl();

    this.core.scene.onBeforeRenderObservable.add(() => this.updateCamera())
  }

  updateCamera() {
    const x = this.camera.position.x + (this.core.inputManager.x * this.core.inputManager.xMul);
    const y = this.camera.position.y + (this.core.inputManager.y * this.core.inputManager.yMul);
    let z = this.camera.position.z + (this.core.inputManager.z * this.core.inputManager.zMul);

    if (z < -this.maxZ) {
      z = -this.maxZ;
    }
    if (z > -this.minZ) {
      z = -this.minZ;
    }

    this.camera.position.set(x, y, z);
  }
}