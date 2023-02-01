import { ActionManager, ExecuteCodeAction } from "@babylonjs/core";
import Core from "./Core";

export default class ControlManager {
  core: Core;

  constructor(core: Core) {
    this.core = core;
    
    const actionManager = new ActionManager(this.core.scene);
    
    actionManager
  }
}