import SideDTO from "@/core/side/SideDTO";

export default interface ScenarioDef {
  name: string;
  mapLimit: { top: number, bottom: number, left: number, right: number };
  sides: SideDTO[];
}