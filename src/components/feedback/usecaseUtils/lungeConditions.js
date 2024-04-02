import PoseLandmarks from "../videoViewer/utils/poseLandmarks";
import {
  doubleAlignmentController, doubleAngleController,
  shiftController,
  targetController
} from "../videoViewer/utils/poseCalculations";

/**
 * This function checks certain conditions for the stretching exercise via the bodyLandmarks.
 *
 * An overview of the conditions can be found on page 36 of the master's thesis.
 */

export default function lungeConditions (ctx, drawingUtils, perspective, bodyLandmarks, handleFeedbackTexts, state) {

  // Thresholds
  const sideKneeAngleThreshold0 = 7;
  const sideKneeAngleThreshold1 = 30;
  const sideHipThreshold = 0.04;
  const sideBodyThreshold0 = 0.01;
  const sideBodyThreshold1 = 0.02;

  const backLegThreshold = 0.03;
  const backHipThreshold = 0.05;
  const backBodyThreshold0 = 0.015;
  const backBodyThreshold1 = 0.02;

  // Create landmarks that are relevant for viewing from the bodyLandmarks of MediaPipe.
  const poseLandmarks = PoseLandmarks(bodyLandmarks);

  if (bodyLandmarks[0] !== undefined) {

    // Perspective 1: Side view
    if (perspective === 1) {

      // Check whether leftLeg or rightLeg is the front leg
      const isLeftSide = poseLandmarks.leftLeg[0][1].y < poseLandmarks.rightLeg[0][1].y;

      // Condition 1.1
      const sideKneeAngleThreshold = (state === 0)? sideKneeAngleThreshold0 : sideKneeAngleThreshold1;

      doubleAngleController(sideKneeAngleThreshold, isLeftSide,
        poseLandmarks.leftLeg, poseLandmarks.rightLeg, poseLandmarks.legConnector, drawingUtils, ctx,
        handleFeedbackTexts, perspective, "sideLegInfo")

      // Condition 1.2
      shiftController(poseLandmarks.hip[0][0].x, poseLandmarks.hip[0][1].x, sideHipThreshold,
        poseLandmarks.hip, poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts,
        perspective, "sideHipInfo");

      // Condition 1.3
      const sideBodyThreshold = (state === 0)? sideBodyThreshold0 : sideBodyThreshold1;

      const target = {
        x: poseLandmarks.hipCenter[0][0].x,
        y: poseLandmarks.shoulderCenter[0][0].y,
        z: poseLandmarks.shoulderCenter[0][0].z
      }

      targetController(poseLandmarks.hipCenter[0][0].x, poseLandmarks.shoulderCenter[0][0].x, sideBodyThreshold,
        poseLandmarks.shoulderCenter[0][0], target, ctx, handleFeedbackTexts, perspective, "sideBodyInfo");
    }

    // Perspective 2: Back view
    else {
      // Condition 1.4
      doubleAlignmentController(poseLandmarks.leftLeg[0][0].x, poseLandmarks.leftLeg[0][1].x, poseLandmarks.leftLeg[0][2].x,
        poseLandmarks.rightLeg[0][0].x, poseLandmarks.rightLeg[0][1].x, poseLandmarks.rightLeg[0][2].x,
        backLegThreshold, poseLandmarks.leftLeg, poseLandmarks.rightLeg, poseLandmarks.legConnector, drawingUtils,
        handleFeedbackTexts, perspective, "backLegInfo")

      // Condition 1.5
      shiftController(poseLandmarks.hip[0][0].y, poseLandmarks.hip[0][1].y, backHipThreshold,
        poseLandmarks.hip, poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts,
        perspective, "backHipInfo");

      // Condition 1.6
      const backBodyThreshold = (state === 0)? backBodyThreshold0 : backBodyThreshold1;

      const target = {
        x: poseLandmarks.hipCenter[0][0].x,
        y: poseLandmarks.shoulderCenter[0][0].y,
        z: poseLandmarks.shoulderCenter[0][0].z
      }

      targetController(poseLandmarks.hipCenter[0][0].x, poseLandmarks.shoulderCenter[0][0].x, backBodyThreshold,
        poseLandmarks.shoulderCenter[0][0], target, ctx, handleFeedbackTexts,
        perspective, "backBodyInfo");
    }

  }
}