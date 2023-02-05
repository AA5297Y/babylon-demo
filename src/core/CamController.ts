import { Camera, Engine, MeshBuilder, UniversalCamera, Vector3 } from "@babylonjs/core";
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

    this.updateCamera = () => {
      let x = this.camera.position.x;
      let y = this.camera.position.y;
      let z = this.camera.position.z;
  
      // key
      if (this.core.inputManager.panScrShift.x == 0 && this.core.inputManager.panScrShift.y == 0 && this.core.inputManager.zoomShift == 0) {
        x += (this.core.inputManager.x * this.core.inputManager.xMul);
        y += (this.core.inputManager.y * this.core.inputManager.yMul);
        z += (this.core.inputManager.z * this.core.inputManager.zMul);
      } else {
        x += (this.core.inputManager.panScrShift.x * 50);
        y += (this.core.inputManager.panScrShift.y * 50);
        z += (this.core.inputManager.zoomShift * 1500);
  
        this.core.inputManager.zoomShift = 0;
      }
  
      if (z < -this.maxZ) {
        z = -this.maxZ;
      }
      if (z > -this.minZ) {
        z = -this.minZ;
      }
  
      this.camera.position.set(x, y, z);
  
      this.ui();
    }

    this.core.scene.onBeforeRenderObservable.add(this.updateCamera)
  }

  updateCamera  = () => {}

  ui() {
    const absX = Math.abs(this.core.inputManager.panScrShift.x);
    const absY = Math.abs(this.core.inputManager.panScrShift.y);
    const min = absX < absY ? absX : absY;
    const max = absX > absY ? absX : absY;
    const ratio = min / max;

    let cursor = "default";
    if (this.core.inputManager.panScrShift.x > 0) {
      if (this.core.inputManager.panScrShift.y > 0) {
        if (ratio > 0.33) {
          cursor = "ne-resize";
        } else if (absX > absY) {
          cursor = "e-resize";
        } else if (absX < absY) {
          cursor = "n-resize";
        }
      } else if (this.core.inputManager.panScrShift.y < 0) {
        if (ratio > 0.33) {
          cursor = "se-resize";
        } else if (absX > absY) {
          cursor = "e-resize";
        } else if (absX < absY) {
          cursor = "s-resize";
        }
      }
    } else if (this.core.inputManager.panScrShift.x < 0) {
      if (this.core.inputManager.panScrShift.y > 0) {
        if (ratio > 0.33) {
          cursor = "nw-resize";
        } else if (absX > absY) {
          cursor = "w-resize";
        } else if (absX < absY) {
          cursor = "n-resize";
        }
      } else if (this.core.inputManager.panScrShift.y < 0) {
        if (ratio > 0.33) {
          cursor = "sw-resize";
        } else if (absX > absY) {
          cursor = "w-resize";
        } else if (absX < absY) {
          cursor = "s-resize";
        }
      }
    }
    
    if (this.core.inputManager.zoomLastValue != null) {
      cursor = "zoom-in";
    }

    if (this.core.scene.hoverCursor != cursor) {
      this.core.canvas.style.cursor = cursor;
    }
  }
}