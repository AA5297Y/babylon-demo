import Unit from "@/unit/Unit";
import Comms from "../Comms";
import CommDTO from "./CommDTO";

export default class Comm extends Comms {
  type = "comm";
  commDTO: CommDTO;
  
  constructor(commDTO: CommDTO, parent: Unit) {
    super(parent);

    this.commDTO = commDTO;
  }
}