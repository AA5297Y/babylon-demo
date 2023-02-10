import Unit from "@/unit/Unit";
import Component from "../Component";
import SignalDTO from "./SignalDTO";

export default class Signal {
  type: string;
  forward: number;
  side: number;
  rear: number;

  constructor(signalDTO: SignalDTO) {
    this.forward = signalDTO.forward;
    this.side = signalDTO.side;
    this.rear = signalDTO.rear;
  }
}