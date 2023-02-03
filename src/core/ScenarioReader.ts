import ScenarioDef from "@/scenario/definition/ScenarioDef";
import Aircraft from "@/unit/Aircraft/Aircraft";
import Core from "./Core";

export default class ScenarioReader { 
  core: Core;
  scenario: ScenarioDef;

  constructor(core: Core, scenario: ScenarioDef) {
    this.core = core;
    this.scenario = scenario;

    this.loadUnit();
  }

  loadUnit() {
    this.scenario.units.forEach((value) => {
      if (value.type == 'aircraft') {
        this.core.units.push(new Aircraft(value.data, this.core.scene));
      }
    })
  }

  unload() {

  }
}