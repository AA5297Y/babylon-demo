import ScenarioDef from "@/scenario/definition/ScenarioDef";
import Aircraft from "@/unit/Aircraft/Aircraft";
import Core from "./Core";
import Side from "./side/Side";

export default class ScenarioReader { 
  core: Core;
  scenario: ScenarioDef;
  setDefaultSideFirstTime: boolean = false;

  constructor(core: Core, scenario: ScenarioDef) {
    this.core = core;
    this.scenario = scenario;

    this.setDefaultSideFirstTime = false;
    this.loadSide();
  }

  loadSide() {
    this.scenario.sides.forEach((value, index) => {
      if (!this.setDefaultSideFirstTime && value.units.length > 0) {
        this.core.side = index;

        this.setDefaultSideFirstTime = true;
      }

      this.core.sides.push(new Side(value, this.core, index));
    })
  }

  unload() {
    
  }
}