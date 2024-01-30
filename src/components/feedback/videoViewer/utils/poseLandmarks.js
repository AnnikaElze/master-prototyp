/**
 * Documentation of body landmarks delivered by mediapipe: https://developers.google.com/mediapipe/solutions/vision/pose_landmarker
 */

export default function PoseLandmarks (bodyLandmarks) {
  if (bodyLandmarks[0] !== undefined){
    const poseLandmarks =
      { leftLeg: [[
          bodyLandmarks[0][23],
          bodyLandmarks[0][25],
          bodyLandmarks[0][27]
        ]],
        rightLeg: [[
          bodyLandmarks[0][24],
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
        leftArm: [[
          bodyLandmarks[0][11],
          bodyLandmarks[0][23],
          bodyLandmarks[0][15]
        ]],
        rightArm: [[
          bodyLandmarks[0][12],
          bodyLandmarks[0][14],
          bodyLandmarks[0][16]
        ]],
        hipCenter: [[{
            x: (bodyLandmarks[0][23].x + bodyLandmarks[0][24].x)/2,
            y: (bodyLandmarks[0][23].y + bodyLandmarks[0][24].y)/2,
            z: (bodyLandmarks[0][23].z + bodyLandmarks[0][24].z)/2
        }]],
        shoulderCenter: [[{
          x: (bodyLandmarks[0][11].x + bodyLandmarks[0][12].x)/2,
          y: (bodyLandmarks[0][11].y + bodyLandmarks[0][12].y)/2,
          z: (bodyLandmarks[0][11].z + bodyLandmarks[0][12].z)/2
        }]],
        legConnector: [
          {start: 0, end: 1},
          {start: 1, end: 2},
          {start: 2, end: 3},
        ],
        armConnector: [
          {start: 0, end: 1},
          {start: 1, end: 2},
          {start: 2, end: 3},
        ],
        limbConnector: [
          {start: 0, end: 1},
        ]
      };
    return (poseLandmarks);
  }
}