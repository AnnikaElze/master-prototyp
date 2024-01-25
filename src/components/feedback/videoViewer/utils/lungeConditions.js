import PoseLandmarks from "./poseLandmarks";
import * as poseCalculations from "./poseCalculations";
import * as poseOverlays from "./poseOverlays";

export default function LungeConditions (drawingUtils, perspective, bodyLandmarks) {

  //Thresholds
  const sideKneeAngleMax = 105;
  const sideKneeAngleMin = 75;
  const sideHipThreshold = 0.05;
  const sideBodyThreshold = 0.01;

  const backKneeThreshold = 0.05;
  const backHipThreshold = 0.05;
  const backBodyThreshold = 0.05;

  const poseLandmarks = PoseLandmarks(bodyLandmarks);

  if (bodyLandmarks[0] !== undefined) {
    const hipCenter = {
      x: (poseLandmarks.hip[0][0].x + poseLandmarks.hip[0][1].x)/2,
      y: (poseLandmarks.hip[0][0].y + poseLandmarks.hip[0][1].y)/2,
      z: (poseLandmarks.hip[0][0].z + poseLandmarks.hip[0][1].z)/2
    };

    const shoulderCenter = {
      x: (poseLandmarks.shoulders[0][0].x + poseLandmarks.shoulders[0][1].x)/2,
      y: (poseLandmarks.shoulders[0][0].y + poseLandmarks.shoulders[0][1].y)/2,
      z: (poseLandmarks.shoulders[0][0].z + poseLandmarks.shoulders[0][1].z)/2
    };

    const body = [[
      hipCenter,
      shoulderCenter
    ]]

    // Perspective 1: Side view of the open side
    if (perspective === 1) {

      // Condition 1: Leg Position
      const kneeAngles = [
        [poseLandmarks.leftLeg, poseCalculations.sideKneeAngleCalculation(poseLandmarks.leftLeg)],
        [poseLandmarks.rightLeg, poseCalculations.sideKneeAngleCalculation(poseLandmarks.rightLeg)]
      ]

      kneeAngles.forEach(kneeAngle => {
        if (kneeAngle[1] > sideKneeAngleMax || kneeAngle[1] < sideKneeAngleMin) {
          poseOverlays.skeletonOverlay('red', kneeAngle[0], poseLandmarks.legConnector, drawingUtils)
        } else {
          poseOverlays.skeletonOverlay('green', kneeAngle[0], poseLandmarks.legConnector, drawingUtils)
        }
      })

      // Condition 2: Hip Position
      const hipShift = poseCalculations.sideHipCalculation(poseLandmarks.hip[0][0], poseLandmarks.hip[0][1]);

      if (hipShift > sideHipThreshold) {
        poseOverlays.skeletonOverlay('red', poseLandmarks.hip, poseLandmarks.hipConnector, drawingUtils)
      } else {
        poseOverlays.skeletonOverlay('green', poseLandmarks.hip, poseLandmarks.hipConnector, drawingUtils)
      }

      // Condition 3: Upper Body Position
      const bodyShift = poseCalculations.sideBodyCalculation(hipCenter, shoulderCenter);

      if (bodyShift > sideBodyThreshold) {
        poseOverlays.skeletonOverlay('red', body, poseLandmarks.bodyConnector, drawingUtils)
      } else {
        poseOverlays.skeletonOverlay('green', body, poseLandmarks.bodyConnector, drawingUtils)
      }
    }

    // Perspective 2: Back view
    else {
      // Condition 1: Leg Position
      // ToDo

      // Condition 2: Hip Position
      // ToDo

      // Condition 3: Upper Body Position
      // ToDo

    }

  }
}