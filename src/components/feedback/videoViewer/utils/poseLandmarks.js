export default function PoseLandmarks (bodyLandmarks) {
  if (bodyLandmarks[0] !== undefined){
    const poseLandmarks =
      { leftLeg: [[
          bodyLandmarks[0][23],
          bodyLandmarks[0][25],
          bodyLandmarks[0][27]
        ]],
        upperLeftLeg: [[
          bodyLandmarks[0][23],
          bodyLandmarks[0][25]
        ]],
        lowerLeftLeg: [[
          bodyLandmarks[0][25],
          bodyLandmarks[0][27]
        ]],
        rightLeg: [[
          bodyLandmarks[0][24],
          bodyLandmarks[0][26],
          bodyLandmarks[0][28]
        ]],
        upperRightLeg: [[
          bodyLandmarks[0][24],
          bodyLandmarks[0][26]
        ]],
        lowerRightLeg: [[
          bodyLandmarks[0][26],
          bodyLandmarks[0][28]
        ]],
        hip: [[
          bodyLandmarks[0][23],
          bodyLandmarks[0][24],
        ]],
        shoulders: [[
          bodyLandmarks[0][11],
          bodyLandmarks[0][12],
        ]],
        legConnector: [
          {start: 0, end: 1},
          {start: 1, end: 2},
          {start: 2, end: 3},
        ],
        limbConnector: [
          {start: 0, end: 1},
        ],
      };
    return (poseLandmarks);
  }
}