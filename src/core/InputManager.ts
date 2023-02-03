import { Action, ActionManager, ExecuteCodeAction, float, InterpolateValueAction, PointerEventTypes, Ray, SetValueAction, Vector2, Vector3, WebXRControllerMovement } from "@babylonjs/core";
import Core from "./Core";

export default class InputManager {
  core: Core;

  // key
  x: float = 0;
  y: float = 0;
  z: float = 0;
  xMul: float = 20;
  yMul: float = 20;
  zMul: float = 20;

  keyMap = {
    xNeg: 'arrowleft',
    xPst: 'arrowright',
    yNeg: 'arrowdown',
    yPst: 'arrowup',
    zNeg: 'x',
    zPst: 'z',
  };

  // mouse  
  mouseDownMap = {
    m0: {button: 0, buttons: 1},
    m1: {button: 1, buttons: 4},
    m2: {button: 2, buttons: 2},
    m3: {button: 4, buttons: 16},
    m4: {button: 3, buttons: 8},
    m02: {button: 2, buttons: 3},
    m20: {button: 0, buttons: 3}
  }
  mouseUpMap = {
    m0: {button: 0, buttons: 0},
    m1: {button: 1, buttons: 0},
    m2: {button: 2, buttons: 0},
    m3: {button: 4, buttons: 0},
    m4: {button: 3, buttons: 0},
    m02: {button: 2, buttons: 0},
    m20: {button: 0, buttons: 0}
  }
  mouseOverMap = {
    m_1: {button: -1, buttons: 0},
    m0: {button: -1, buttons: 1},
    m1: {button: -1, buttons: 4},
    m2: {button: -1, buttons: 2},
    m3: {button: -1, buttons: 16},
    m4: {button: -1, buttons: 8},
    m20: {button: -1, buttons: 3},
  }

  panScrStartPoint: Vector2 = null;
  panScrShift = {x: 0, y: 0};
  resetPanScr() {
    this.panScrStartPoint = null;
    this.panScrShift = {x: 0, y: 0}
  }
  zoomLastValue: number = null;
  zoomShift = 0;

  pickedPoint: Vector3 = null;

  constructor(core: Core) {
    this.core = core;

    this.setCamAction();
  }

  mouseBtnMap(ev: any, map: {button: number, buttons: number}): boolean {
    return (ev.button == map.button && ev.buttons == map.buttons)
  }

  setCamAction() {
    // key down
    this.core.scene.actionManager.registerAction(new ExecuteCodeAction(
      ActionManager.OnKeyDownTrigger, (ev) => {
        if (ev.sourceEvent.ctrlKey || ev.sourceEvent.shiftKey || ev.sourceEvent.altKey) {
          return;
        }

        switch (ev.sourceEvent.key.toLowerCase()) {
          case this.keyMap.xNeg:
            this.x = -1;
            break;
          case this.keyMap.xPst:
            this.x = 1;
            break;
          case this.keyMap.yNeg:
            this.y = -1;
            break;
          case this.keyMap.yPst:
            this.y = 1;
            break;
          case this.keyMap.zNeg:
            this.z = -1;
            break;
          case this.keyMap.zPst:
            this.z = 1;
            break;
        }
      }
    ))
      
    // key up
    this.core.scene.actionManager.registerAction(new ExecuteCodeAction(
      ActionManager.OnKeyUpTrigger, (ev) => {
        switch (ev.sourceEvent.key.toLowerCase()) {
          case this.keyMap.xNeg:
            this.x = 0;
            break;
          case this.keyMap.xPst:
            this.x = 0;
            break;
          case this.keyMap.yNeg:
            this.y = 0;
            break;
          case this.keyMap.yPst:
            this.y = 0;
            break;
          case this.keyMap.zNeg:
            this.z = 0;
            break;
          case this.keyMap.zPst:
            this.z = 0;
            break;
        }
      }
    ))

    // mouse
    this.core.scene.onPointerObservable.add((ev) => {
      switch (ev.type) {
        case PointerEventTypes.POINTERDOWN:
          break;
        case PointerEventTypes.POINTERUP:
          this.panScrStartPoint = null;
          this.panScrShift = {x: 0, y: 0};
          this.zoomLastValue = null;
          this.zoomShift = 0;

          this.core.canvas.style.cursor = "default";
          break;
        case PointerEventTypes.POINTERMOVE:
          // pan
          if (this.mouseBtnMap(ev.event, this.mouseOverMap.m2)) {
            if (this.panScrStartPoint == null) {
              this.panScrStartPoint = new Vector2(ev.event.clientX, ev.event.clientY);
              return;
            }

            this.panScrShift.x = (ev.event.clientX - this.panScrStartPoint.x) / screen.height;
            this.panScrShift.y = (this.panScrStartPoint.y - ev.event.clientY) / screen.height;
          }

          // zoom
          if (this.mouseBtnMap(ev.event, this.mouseOverMap.m20)) {
            this.panScrShift = {x: 0, y: 0};

            if (this.zoomLastValue != null) {
              this.zoomShift = (this.zoomLastValue - ev.event.clientY) / screen.height;
            }
            
            this.zoomLastValue = ev.event.clientY;
          }
          break;
      }
    })
  }
}