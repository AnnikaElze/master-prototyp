import PoseLandmarks from "../videoViewer/utils/poseLandmarks";
import {alignmentController, angleController, shiftController, targetController} from "../videoViewer/utils/poseCalculations";

/**
 * @parent VideoViewer
 * @props ctx, drawingUtils, perspective, bodyLandmarks, handleFeedbackTexts
 * @creats thresholds
 * @helpfunctions PoseLandmarks - provides pose landmark groups from body landmarks by mediapipe
 *                angleController - checks if the angle between two limbs is 90 degree
 *                shiftController - checks the difference between two values
 *                targetController - checks the distance to a target coordinate
 *                alignmentController - checks the linear alignment of three points
 */

export default function lungeConditions (ctx, drawingUtils, perspective, bodyLandmarks, handleFeedbackTexts) {

  //Thresholds
  const sideKneeAngleThreshold = 0.002;
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
      angleController(sideKneeAngleThreshold, isLeftSide,
        poseLandmarks.leftLeg, poseLandmarks.legConnector, drawingUtils, ctx, handleFeedbackTexts,
        perspective, "sideLeftLegInfo")
      angleController(sideKneeAngleThreshold, isLeftSide,
        poseLandmarks.rightLeg, poseLandmarks.legConnector, drawingUtils, ctx, handleFeedbackTexts,
        perspective, "sideRightLegInfo")

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
      alignmentController(poseLandmarks.leftLeg[0][0].x, poseLandmarks.leftLeg[0][1].x, poseLandmarks.leftLeg[0][2].x, backLegThreshold, poseLandmarks.leftLeg,
        poseLandmarks.legConnector, drawingUtils, handleFeedbackTexts, perspective, "backLeftLegInfo")
      alignmentController(poseLandmarks.rightLeg[0][0].x, poseLandmarks.rightLeg[0][1].x, poseLandmarks.rightLeg[0][2].x, backLegThreshold, poseLandmarks.rightLeg,
        poseLandmarks.legConnector, drawingUtils, handleFeedbackTexts, perspective, "backRightLegInfo")

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