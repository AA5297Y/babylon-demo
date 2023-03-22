interface FuelTankDTO {
  type: String;
  detachable: boolean
  capacity: number;
}

enum TYPE {
  aviationFuel = 'aviationFuel',
  rocket = "rocket",
}

export { FuelTankDTO, TYPE }
