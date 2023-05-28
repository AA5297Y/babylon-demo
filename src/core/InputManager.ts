import { Action, ActionManager, ExecuteCodeAction, float, InterpolateValueAction, PointerEventTypes, PointerInfo, Ray, SetValueAction, Vector2, Vector3, WebXRControllerMovement } from "@babylonjs/core";
import Core from "./Core";
import Unit from "@/unit/Unit";

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
    p: 'p',
    pause: 'pause',
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

  // mouse coordinate
  panScrStartPoint: Vector2 = null;
  panScrShift = {x: 0, y: 0};
  resetPanScr() {
    this.panScrStartPoint = null;
    this.panScrShift = {x: 0, y: 0}
  }
  zoomLastValue: number = null;
  zoomShift = 0;

  constructor(core: Core) {
    this.core = core;

    this.setInputActions();
  }

  mouseBtnMap(ev: any, map: {button: number, buttons: number}): boolean {
    return (ev.event.button == map.button && ev.event.buttons == map.buttons)
  }

  // mouse
  mouseStayPositionWhileEvent () {
    return this.panScrShift.x == 0 && this.panScrShift.y == 0 && this.zoomShift == 0;
  }

  setInputActions() {
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
          case this.keyMap.p:
            this.core.gamePauseSw();
            break;
          case this.keyMap.pause:
            this.core.gamePauseSw();
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
    this.core.scene.onPointerObservable.add((ev, es) => {
      switch (ev.type) {
        case PointerEventTypes.POINTERDOWN:
          if (this.mouseBtnMap(ev, this.mouseDownMap.m0)) {
            this.handleLeftDown(ev);
          }
          break;
        case PointerEventTypes.POINTERUP:
          // leftup
          if (this.mouseBtnMap(ev, this.mouseUpMap.m0)) {
            if (this.mouseStayPositionWhileEvent()) {
              this.handleLeftUp(ev);
            }
          }
          
          // rightup
          if (this.mouseBtnMap(ev, this.mouseUpMap.m2)) {
            if (this.mouseStayPositionWhileEvent()) {
              this.handleRightUp(ev);
            }

            this.panScrStartPoint = null;
            this.panScrShift = {x: 0, y: 0};
            this.zoomLastValue = null;
            this.zoomShift = 0;
  
            this.core.canvas.style.cursor = "default";
          }
          break;
        case PointerEventTypes.POINTERMOVE:
          // pan
          if (this.mouseBtnMap(ev, this.mouseOverMap.m2)) {
            if (this.panScrStartPoint == null) {
              this.panScrStartPoint = new Vector2(ev.event.clientX, ev.event.clientY);
              return;
            }

            this.panScrShift.x = (ev.event.clientX - this.panScrStartPoint.x) / screen.height;
            this.panScrShift.y = (this.panScrStartPoint.y - ev.event.clientY) / screen.height;
          }

          // zoom
          if (this.mouseBtnMap(ev, this.mouseOverMap.m20)) {
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
  
  handleLeftUp (ev: PointerInfo) {
    if (!this.core.selectTargetMode) {
      this.core.clearSelection();
    }
  }

  handleRightUp(ev: PointerInfo) {
    if (this.core.selectTargetMode) {
      this.core.selectTargetMode = false;
    }
    else {
      if (this.core.selection.length > 0) {
        this.core.showUnitContextMenu();
      }
    }
  }

  handleLeftDown(ev: PointerInfo) {
    this.core.select(new Vector3(ev.pickInfo.pickedPoint.x, ev.pickInfo.pickedPoint.y, 0), new Vector2(ev.event.x, ev.event.y), ev.event.shiftKey)
  }

  handleRightDown(ev: PointerInfo) {

  }
}
  