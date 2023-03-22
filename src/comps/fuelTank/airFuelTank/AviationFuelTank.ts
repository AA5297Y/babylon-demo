import FuelTank from "../FuelTank";
import { FuelTankDTO, TYPE } from "../FuelTankDTO";

export default class AviationFuelTank extends FuelTank {
  type = TYPE.aviationFuel;

  constructor(fuelTankDTO: FuelTankDTO) {
    super(fuelTankDTO);
  }
}