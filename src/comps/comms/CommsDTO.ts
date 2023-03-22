import CommDTO from "./comm/CommDTO";

interface CommsDTO {
  type: String;
  name: String;
  signal: number;
  range: number;
  data: CommDTO;
}

enum TYPE {
  comm = "comm",
}

export { CommsDTO, TYPE };
