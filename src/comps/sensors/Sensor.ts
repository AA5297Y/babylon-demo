import { Scene } from "@babylonjs/core";
import Unit from "../../unit/Unit";
import Component from "../Component";

export default class Sensor extends Component {
  type: String;

  constructor(parent: Unit) {
    super(parent);
  }

  update(): void {
    return
  }
}