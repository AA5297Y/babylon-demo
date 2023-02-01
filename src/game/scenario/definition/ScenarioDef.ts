import Aircraft from "@/game/unit/Aircraft/Aircraft";
import UnitDTO from "@/game/unit/UnitDTO";

export default interface ScenarioDef {
  name: string;
  mapLimit: { top: number, bottom: number, left: number, right: number },
  units: UnitDTO[];
}