import { float } from "@babylonjs/core";
import CommDTO from "./comm/CommDTO";

export default interface CommsDTO {
  type: String;
  signal: number;
  range: number;
  data: CommDTO;
}