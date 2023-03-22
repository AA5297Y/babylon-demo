import JetEngineDTO from "./jetEngine/JetEngineDTO";

interface PropulsionDTO {
  type: String;
  name: String;
  enable: boolean;
  data: JetEngineDTO;
}

enum TYPE {
  jetEngine = 'jetEngine',
  rocket = 'rocket',
}

export { PropulsionDTO, TYPE }
