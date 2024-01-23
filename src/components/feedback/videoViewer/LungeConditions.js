import PoseLandmarks from "./PoseLandmarks";
import kneeAngleCalculation from "./utils/poseCalculations";
import kneeAngleOverlay from "./utils/poseOverlays";

function LungeConditions (drawingUtils, perspective, bodyLandmarks) {

  const poseLandmarks = PoseLandmarks(bodyLandmarks);

  // Perspective 1: Side view of the open side
  if (perspective === 1){
    if (bodyLandmarks[0] !== undefined){
      // Condition 1: Leg Position
      const kneeAngleMax = 105;
      const kneeAngleMin = 75;

      const leftKneeAngle = kneeAngleCalculation(poseLandmarks.leftLeg);
      const rightKneeAngle = kneeAngleCalculation(poseLandmarks.rightLeg);

      kneeAngleOverlay(leftKneeAngle, kneeAngleMin, kneeAngleMax, poseLandmarks.leftLeg, poseLandmarks.legConnector, drawingUtils);
      kneeAngleOverlay(rightKneeAngle, kneeAngleMin, kneeAngleMax, poseLandmarks.rightLeg, poseLandmarks.legConnector, drawingUtils);
    }
  }

  // Perspective 2: Back view
  else {

  }
}


export default LungeConditions;

// Draw all Landmarks:
// landmarks.forEach(landmark => {
//       drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS, {color: 'white', lineWidth: 1});
//       drawingUtils.drawLandmarks(landmark, {color: 'white', radius: 1});
//     });