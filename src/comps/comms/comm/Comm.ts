import Unit from "@/unit/Unit";
import Comms from "../Comms";
import * as CommsDTO from "../CommsDTO";
import CommDTO from "./CommDTO";

export default class Comm extends Comms {
  type = CommsDTO.TYPE.comm;
  commDTO: CommDTO;
  
  constructor(commDTO: CommDTO, parent: Unit) {
    super(parent);

    this.commDTO = commDTO;
  }
}