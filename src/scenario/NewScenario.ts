import { Vector3 } from "@babylonjs/core";
import units from "./db/units";
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
      name: '1',
      units: [
        {
          callSign: "Tiger-0",
          position: new Vector3(-50, 0, 0),
          rotation: Vector3.Zero(),
          ...units["J-20"],
        }
      ]
    },
    {
      name: '0',
      units: [
        {
          callSign: "Tiger-0",
          position: new Vector3(0, 0, 0),
          rotation: Vector3.Zero(),
          ...units["JF-17 block 2"],
        },
        {
          callSign: "Tiger-0",
          position: new Vector3(50, 0, 0),
          rotation: Vector3.Zero(),
          ...units["JF-17 block 3"],
        }
      ]
    },
  ],
}