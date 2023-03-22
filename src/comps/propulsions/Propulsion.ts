import Component from "../Component";
import { TYPE } from "./PropulsionDTO";

export default class Propulsion extends Component {
  type: TYPE;
  name: String;
  enable: boolean;

  altitude: number;
  speed: number;
  fuelConsumption: number;
}