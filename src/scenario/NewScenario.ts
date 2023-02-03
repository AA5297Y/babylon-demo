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
      data: {
        callSign: "Tiger-0",
        name: "jf-17 block 2",
        position: new Vector3(-100, 0, 0),
        sensors: [
          {type: "radar", data: {range1m2: 45, angle: 90, esa: false}}
        ],
        turningRate: 1.5,
        turnAroundRate: 2,
        climbRate: 100,
      }
    },
    {
      type: 'aircraft',
      data: {
        callSign: "Tiger-1",
        name: "jf-17 block 3",
        position: Vector3.Zero(),
        sensors: [
          {type: "radar", data: {range1m2: 60, angle: 120, esa: true}}
        ],
        turningRate: 1.5,
        turnAroundRate: 2,
        climbRate: 100,
      }
    },
    {
      type: 'aircraft',
      data: {
        callSign: "Tiger-2",
        name: "j-20",
        position: new Vector3(100, 0, 0),
        sensors: [
          {type: "radar", data: {range1m2: 120, angle: 120, esa: true}}
        ],
        turningRate: 2,
        turnAroundRate: 3,
        climbRate: 100,
      }
    }
  ]
}