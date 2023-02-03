import { Vector3 } from "@babylonjs/core";
import ScenarioDef from "./definition/ScenarioDef";

export default {
  name: '新场景',
  mapLimit: {
    top: 500,
    bottom: 500,
    left: 500,
    right: 500
  },
  units: [
    {
      type: 'aircraft',
      callSign: "Tiger-0",
      name: "jf-17 block 2",
      side: '0',
      position: new Vector3(-100, 0, 0),
      rotation: Vector3.Zero(),
      data: {
        sensors: [
          {type: "radar", data: {range1m2: 45, angle: 90, esa: false, defaultRcs: 5, maxRcs: 50}}
        ],
        comms: [
          {type: "comm", signal: 1, range: 100, data: {name: "HF", interval: 5}}
        ],
        turnAroundRate: 2,
        turningRate: 4,
        climbRate: 100,
      }
    },
    {
      type: 'aircraft',
      callSign: "Tiger-1",
      name: "jf-17 block 3",
      side: '1',
      position: Vector3.Zero(),
      rotation: Vector3.Zero(),
      data: {
        sensors: [
          {type: "radar", data: {range1m2: 60, angle: 120, esa: true, defaultRcs: 5, maxRcs: 50}}
        ],
        comms: [
          {type: "comm", signal: 1, range: 100, data: {name: "HF", interval: 2}}
        ],
        turnAroundRate: 2,
        turningRate: 4,
        climbRate: 100,
      }
    },
    {
      type: 'aircraft',
      callSign: "Tiger-2",
      name: "j-20",
      side: '1',
      position: new Vector3(100, 0, 0),
      rotation: Vector3.Zero(),
      data: {
        sensors: [
          {type: "radar", data: {range1m2: 120, angle: 120, esa: true, defaultRcs: 5, maxRcs: 50}}
        ],
        comms: [
          {type: "comm", signal: 1, range: 150, data: {name: "HF", interval: 2}}
        ],
        turnAroundRate: 3,
        turningRate: 5.5,
        climbRate: 100,
      }
    }
  ]
}