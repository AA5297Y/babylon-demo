import { CommsDTO } from "@/comps/comms/CommsDTO";
import { FuelTankDTO } from "@/comps/fuelTank/FuelTankDTO";
import { PropulsionDTO } from "@/comps/propulsions/PropulsionDTO";
import { SensorDTO } from "@/comps/sensors/SensorDTO";
import { SignalDTO } from "@/comps/signals/SignalDTO";
import { Vector3 } from "@babylonjs/core";
import Aircraft from "./Aircraft/Aircraft";
import AircraftDTO from "./Aircraft/AircraftDTO";

interface UnitDTO {
  type: String;
  callSign: String;
  name: String;
  position: Vector3;

  sensors: SensorDTO[];
  comms: CommsDTO[];
  signals: SignalDTO[];
  
  fuelTanks: FuelTankDTO[];
  propulsions: PropulsionDTO[];
  turningRate: number;
  turnAroundRate: number;
  
  data: AircraftDTO;
}

enum TYPE {
  aircraft = 'aircraft',
}

export { UnitDTO, TYPE };