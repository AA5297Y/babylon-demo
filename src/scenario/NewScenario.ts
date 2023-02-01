import ScenarioDef from "./definition/ScenarioDef";

export default class NewScenario {
  load(): ScenarioDef {
    return {
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
            callSign: "Tiger-1",
            name: "jf-17 block 3",
            sensors: [
              {type: "radar", data: {range1m2: 60, angle: 120, esa: true}}
            ]
          }
        },
        {
          type: 'aircraft',
          data: {
            callSign: "Tiger-2",
            name: "j-20",
            sensors: [
              {type: "radar", data: {range1m2: 125, angle: 120, esa: true}}
            ]
          }
        }
      ]
    }
  }
}