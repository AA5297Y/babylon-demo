import Aircraft from "@/unit/Aircraft/Aircraft";
import UnitDTO from "@/unit/UnitDTO";

export default interface ScenarioDef {
  name: string;
  mapLimit: { top: number, bottom: number, left: number, right: number };
  units: UnitDTO[];
}