import PoseLandmarks from "./poseLandmarks";
import {angleController, shiftController, targetController} from "./poseCalculations";

export default function LungeConditions (ctx, drawingUtils, perspective, bodyLandmarks, handleFeedbackTexts) {

  //Thresholds
  const sideKneeAngleMax = 105;
  const sideKneeAngleMin = 75;
  const sideHipThreshold = 0.04;
  const sideBodyThreshold = 0.01;

  const backLegThreshold = 0.03;
  const backHipThreshold = 0.05;
  const backBodyThreshold = 0.01;

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

    // Perspective 1: Side view of the open side
    if (perspective === 1) {

      const isLeftSide = poseLandmarks.leftLeg[0][1].y < poseLandmarks.rightLeg[0][1].y;

      // Condition 1: Leg Position
      angleController(sideKneeAngleMax, sideKneeAngleMin, isLeftSide,
        poseLandmarks.leftLeg, poseLandmarks.legConnector, drawingUtils, ctx, handleFeedbackTexts,
        perspective, "sideLegInfo")
      angleController(sideKneeAngleMax, sideKneeAngleMin, isLeftSide,
        poseLandmarks.rightLeg, poseLandmarks.legConnector, drawingUtils, ctx, handleFeedbackTexts,
        perspective, "sideLegInfo")

      // Condition 2: Hip Position
      shiftController(poseLandmarks.hip[0][0].x, poseLandmarks.hip[0][1].x, sideHipThreshold,
        poseLandmarks.hip, poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts,
        perspective, "sideHipInfo");

      // Condition 3: Upper Body Position
      const target = {
        x: hipCenter.x,
        y: shoulderCenter.y,
        z: shoulderCenter.z
      }

      targetController(hipCenter.x, shoulderCenter.x, sideBodyThreshold, shoulderCenter, target,
        ctx, handleFeedbackTexts, perspective, "sideBodyInfo");
    }

    // Perspective 2: Back view
    else {
      // Condition 1: Leg Position
      shiftController(poseLandmarks.leftLeg[0][0].x, poseLandmarks.leftLeg[0][1].x, backLegThreshold,
        poseLandmarks.upperLeftLeg, poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts,
        perspective, "backLegInfo");
      shiftController(poseLandmarks.leftLeg[0][1].x, poseLandmarks.leftLeg[0][2].x, backLegThreshold,
        poseLandmarks.lowerLeftLeg, poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts,
        perspective, "backLegInfo");
      shiftController(poseLandmarks.rightLeg[0][0].x, poseLandmarks.rightLeg[0][1].x, backLegThreshold,
        poseLandmarks.upperRightLeg, poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts,
        perspective, "backLegInfo");
      shiftController(poseLandmarks.rightLeg[0][1].x, poseLandmarks.rightLeg[0][2].x, backLegThreshold,
        poseLandmarks.lowerRightLeg, poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts,
        perspective, "backLegInfo");

      // Condition 2: Hip Position
      shiftController(poseLandmarks.hip[0][0].y, poseLandmarks.hip[0][1].y, backHipThreshold,
        poseLandmarks.hip, poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts,
        perspective, "backHipInfo");

      // Condition 3: Upper Body Position
      const target = {
        x: hipCenter.x,
        y: shoulderCenter.y,
        z: shoulderCenter.z
      }

      targetController(hipCenter.x, shoulderCenter.x, backBodyThreshold,
        shoulderCenter, target, ctx, handleFeedbackTexts,
        perspective, "backBodyInfo");
    }

  }
}