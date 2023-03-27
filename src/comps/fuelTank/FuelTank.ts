import { FuelTankDTO, TYPE } from "./FuelTankDTO";

export default class FuelTank {
  type: TYPE;
  detachable: boolean;
  capacity: number;
  amount: number;

  constructor(fuelTankDTO: FuelTankDTO) {
    this.capacity = fuelTankDTO.capacity;
    this.detachable = fuelTankDTO.detachable;
    
    this.amount = this.capacity;
  }

  consume(fuel: number): boolean {
    if (this.amount < 0) {
      this.amount = 0;
      return false;
    }

    this.amount -= fuel;
    return true;
  }

  resupply(fuel: number): boolean {
    if (this.amount > this.capacity) {
      this.amount = this.capacity;
      return false;
    }

    this.amount += fuel;
    return true;
  }

  fill(): void {
    this.amount = this.capacity;
  }

  empty(): boolean {
    return this.capacity == 0;
  }
} 