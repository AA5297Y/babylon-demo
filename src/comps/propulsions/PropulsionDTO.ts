import JetEngine from "./jetEngine/JetEngine";
import JetEngineDTO from "./jetEngine/JetEngineDTO";

export default interface PropulsionDTO {
  type: String;
  name: String;
  enable: boolean;
  acceleration: number;
  data: JetEngineDTO;
}