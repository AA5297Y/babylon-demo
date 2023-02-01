import { Action, ActionManager, ExecuteCodeAction, float, InterpolateValueAction, SetValueAction, WebXRControllerMovement } from "@babylonjs/core";
import Core from "./Core";

export default class InputManager {
  core: Core;

  x: float = 0;
  y: float = 0;
  z: float = 0;
  xMul: float = 10;
  yMul: float = 10;
  zMul: float = 10;

  keyMap = {
    xNeg: 'arrowleft',
    xPst: 'arrowright',
    yNeg: 'arrowdown',
    yPst: 'arrowup',
    zNeg: 'x',
    zPst: 'z'
  };

  constructor(core: Core) {
    this.core = core;

    this.setCamAction();
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
    this.core.scene.actionManager.registerAction(new ExecuteCodeAction(
      ActionManager.OnRightPickTrigger, (ev) => {
        console.log(ev)
      }
    ))
  }
}