import Unit from "../unit/Unit";

export default class Component {
  parent: Unit;

  constructor(parent: Unit) {
    this.parent = parent;
  }
}