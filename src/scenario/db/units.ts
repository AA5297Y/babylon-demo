import { Vector3 } from "@babylonjs/core";

export default {
  "JF-17 block 2": {
    type: 'aircraft',
    name: "jf-17 block 2",
    sensors: [
      {type: "radar", name: 'KLJ-7', passive: false, refreshRate: 2, data: {range1m2: 40, angle: 90, esa: false, defaultRcs: 5, maxRcs: 50}}
    ],
    comms: [
      {type: "comm", name: "HF Radio", signal: 1, range: 100, data: {interval: 5}}
    ],
    signals: [
      {type: "rcs", forward: 4.0, side: 6.2, rear: 4.8}
    ],
    fuelTanks: [
      {type: "aviationFuel", detachable: false, capacity: 4500}
    ],
    propulsions: [
      {type: "jetEngine", name: 'RD93x1', enable: true, data: {
        performance: [
          {altitude: 30, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
          ]},
          {altitude: 500, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 540, fuelConsumption: 2.0},
          ]},
          {altitude: 1200, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 580, fuelConsumption: 2.0},
          ]},
          {altitude: 2500, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 640, fuelConsumption: 2.0},
          ]},
          {altitude: 5000, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 720, fuelConsumption: 2.0},
          ]},
          {altitude: 12000, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 920, fuelConsumption: 2.0},
          ]},
          {altitude: 25000, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 920, fuelConsumption: 2.0},
          ]},
          {altitude: 36000, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 920, fuelConsumption: 2.0},
          ]},
        ]
      }}
    ],
    turnAroundRate: 3,
    turningRate: 4,
    data: {
      climbRate: 100,
    }
  },
  "JF-17 block 3": {
    type: 'aircraft',
    name: "jf-17 block 3",
    sensors: [
      {type: "radar", name: 'KLJ-7A', passive: false, refreshRate: 2, data: {range1m2: 60, angle: 120, esa: true, defaultRcs: 5, maxRcs: 50}}
    ],
    comms: [
      {type: "comm", name: "HF Radio", signal: 1, range: 100, data: {name: "HF", interval: 2}}
    ],
    signals: [
      {type: "rcs", forward: 3.6, side: 6.0, rear: 4.6}
    ],
    fuelTanks: [
      {type: "aviationFuel", detachable: false, capacity: 4500},
      {type: "aviationFuel", detachable: true, capacity: 1000},
      {type: "aviationFuel", detachable: true, capacity: 1000},
    ],
    propulsions: [
      {type: "jetEngine", name: 'RD93x1', enable: true, data: {
        performance: [
          {altitude: 30, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
          ]},
          {altitude: 500, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 540, fuelConsumption: 2.0},
          ]},
          {altitude: 1200, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 580, fuelConsumption: 2.0},
          ]},
          {altitude: 2500, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 640, fuelConsumption: 2.0},
          ]},
          {altitude: 5000, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 720, fuelConsumption: 2.0},
          ]},
          {altitude: 12000, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 920, fuelConsumption: 2.0},
          ]},
          {altitude: 25000, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 920, fuelConsumption: 2.0},
          ]},
          {altitude: 36000, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 920, fuelConsumption: 2.0},
          ]},
        ]
      }}
    ],
    turnAroundRate: 3,
    turningRate: 4,
    data: {
      climbRate: 100,
    }
  },
  "J-20": {
    type: 'aircraft',
    callSign: "Tiger-2",
    name: "j-20",
    sensors: [
      {type: 'radar', name: 'J-20 AESA', passive: false, refreshRate: 2, data: {range1m2: 135, angle: 120, esa: true, defaultRcs: 5, maxRc5s: 50}}
    ],
    comms: [
      {type: "comm", name: "HF Radio", signal: 1, range: 150, data: {name: "HF", interval: 2}}
    ],
    signals: [
      {type: "rcs", forward: 0.005, side: 0.5, rear: 0.02}
    ],
    fuelTanks: [
      {type: "aviationFuel", detachable: false, capacity: 12000}
    ],
    propulsions: [
      {type: "jetEngine", name: 'RD93x1', enable: true, data: {
        performance: [
          {altitude: 30, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
          ]},
          {altitude: 500, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 540, fuelConsumption: 2.0},
          ]},
          {altitude: 1200, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 580, fuelConsumption: 2.0},
          ]},
          {altitude: 2500, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 640, fuelConsumption: 2.0},
          ]},
          {altitude: 5000, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 720, fuelConsumption: 2.0},
          ]},
          {altitude: 12000, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 920, fuelConsumption: 2.0},
          ]},
          {altitude: 25000, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 920, fuelConsumption: 2.0},
          ]},
          {altitude: 36000, speed: [
            {name: "Loiter", speed: 350, fuelConsumption: 2.0},
            {name: "Curise", speed: 480, fuelConsumption: 2.0},
            {name: "Military", speed: 520, fuelConsumption: 2.0},
            {name: "Afterburn", speed: 920, fuelConsumption: 2.0},
          ]},
        ]
      }}
    ],
    turnAroundRate: 4,
    turningRate: 5.5,
    data: {
      climbRate: 100,
    }
  }
}