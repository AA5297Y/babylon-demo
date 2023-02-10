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
  sides: [
    {
      name: '0',
      units: [
        {
          type: 'aircraft',
          callSign: "Tiger-0",
          name: "jf-17 block 2",
          position: new Vector3(-50, 0, 0),
          rotation: Vector3.Zero(),
          sensors: [
            {type: "radar", name: 'KLJ-7', passive: false, refreshRate: 2, data: {range1m2: 40, angle: 90, esa: false, defaultRcs: 5, maxRcs: 50}}
          ],
          comms: [
            {type: "comm", name: "HF Radio", signal: 1, range: 100, data: {interval: 5}}
          ],
          signals: [
            {type: "rcs", forward: 4.0, side: 6.2, rear: 4.8}
          ],
          turnAroundRate: 2,
          turningRate: 4,
          data: {
            climbRate: 100,
          }
        },
      ]
    },
    {
      name: '1',
      units: [
        {
          type: 'aircraft',
          callSign: "Tiger-1",
          name: "jf-17 block 3",
          position: Vector3.Zero(),
          rotation: Vector3.Zero(),
          sensors: [
            {type: "radar", name: 'KLJ-7A', passive: false, refreshRate: 1, data: {range1m2: 60, angle: 120, esa: true, defaultRcs: 5, maxRcs: 50}}
          ],
          comms: [
            {type: "comm", name: "HF Radio", signal: 1, range: 100, data: {name: "HF", interval: 2}}
          ],
          signals: [
            {type: "rcs", forward: 3.6, side: 6.0, rear: 4.6}
          ],
          turnAroundRate: 2,
          turningRate: 4,
          data: {
            climbRate: 100,
          }
        },
        {
          type: 'aircraft',
          callSign: "Tiger-2",
          name: "j-20",
          position: new Vector3(50, 0, 0),
          rotation: Vector3.Zero(),
          sensors: [
            {type: "radar", name: 'J-20 AESA', passive: false, refreshRate: 2, data: {range1m2: 120, angle: 120, esa: true, defaultRcs: 5, maxRcs: 50}}
          ],
          comms: [
            {type: "comm", name: "HF Radio", signal: 1, range: 150, data: {name: "HF", interval: 2}}
          ],
          signals: [
            {type: "rcs", forward: 0.005, side: 0.5, rear: 0.02}
          ],
          turnAroundRate: 3,
          turningRate: 5.5,
          data: {
            climbRate: 100,
          }
        }
      ]
    }
  ],
}