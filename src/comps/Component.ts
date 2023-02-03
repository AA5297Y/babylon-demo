import Unit from "../unit/Unit";

export default class Component {
  parent: Unit;
  available: boolean = true;

  constructor(parent: Unit) {
    this.parent = parent;
  }

  unAvailable() {
    this.available = false;
  }
}