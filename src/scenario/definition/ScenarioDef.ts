import SideDTO from "@/core/side/SideDTO";

export default interface ScenarioDef {
  name: String;
  mapLimit: { top: number, bottom: number, left: number, right: number };
  sides: SideDTO[];
}