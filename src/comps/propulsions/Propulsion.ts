import Component from "../Component";
import Altitude from "./define/Altitude";

export default class Propulsion extends Component {
  type: String;
  name: String;
  enable: boolean;
  acceleration: number;
}