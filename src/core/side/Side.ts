import Aircraft from "@/unit/Aircraft/Aircraft";
import Unit from "@/unit/Unit";
import Core from "../Core";
import SideDTO from "./SideDTO";

export default class Side {
  core: Core;
  sideDTO: SideDTO;

  id: number;
  name: string;
  units: Unit[] = [];

  constructor(sideDTO: SideDTO, core: Core, id: number) {
    this.core = core;
    this.sideDTO = sideDTO;
    
    this.id = id;
    this.name = this.sideDTO.name;
  
    this.loadUnits();
  }

  loadUnits() {
    this.sideDTO.units.forEach((value) => {
      switch (value.type) {
        case "aircraft":
          this.units.push(new Aircraft(value, this.core, this))
          break;
      }
    })
  }
}