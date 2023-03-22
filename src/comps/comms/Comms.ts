import Unit from "@/unit/Unit";
import Component from "../Component";
import { TYPE } from "./CommsDTO";

export default class extends Component {
  type: TYPE;

  constructor(parent: Unit) {
    super(parent);
  }
}