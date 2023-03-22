import Component from "../Component";
import * as SignalDTO from "./SignalDTO";

export default class Signal {
  type: SignalDTO.TYPE;
  forward: number;
  side: number;
  rear: number;

  constructor(signalDTO: SignalDTO.SignalDTO) {
    this.forward = signalDTO.forward;
    this.side = signalDTO.side;
    this.rear = signalDTO.rear;
  }
}