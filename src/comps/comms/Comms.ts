import Unit from "@/unit/Unit";
import Component from "../Component";

export default class extends Component {
  type: String;

  constructor(parent: Unit) {
    super(parent);
  }
}