import PoseLandmarks from "../videoViewer/utils/poseLandmarks";
import {
  doubleAlignmentController, doubleAngleController,
  shiftController,
  targetController
} from "../videoViewer/utils/poseCalculations";

/**
 * @parent VideoViewer
 * @props ctx, drawingUtils, perspective, bodyLandmarks, handleFeedbackTexts
 * @creats thresholds
 * @helpfunctions PoseLandmarks - provides pose landmark groups from body landmarks by mediapipe
 *                angleController - checks if the angle between two limbs is 90 degree
 *                shiftController - checks the difference between two values
 *                targetController - checks the distance to a target coordinate
 *                alignmentController - checks the difference between three values
 */

export default function lungeConditions (ctx, drawingUtils, perspective, bodyLandmarks, handleFeedbackTexts, state) {

  //Thresholds
  const sideKneeAngleThreshold0 = 7;
  const sideKneeAngleThreshold1 = 30;
  const sideHipThreshold = 0.04;
  const sideBodyThreshold0 = 0.01;
  const sideBodyThreshold1 = 0.02;

  const backLegThreshold = 0.03;
  const backHipThreshold = 0.05;
  const backBodyThreshold0 = 0.015;
  const backBodyThreshold1 = 0.02;

  const poseLandmarks = PoseLandmarks(bodyLandmarks);

  if (bodyLandmarks[0] !== undefined) {

    // Perspective 1: Side view of the open side
    if (perspective === 1) {

      const isLeftSide = poseLandmarks.leftLeg[0][1].y < poseLandmarks.rightLeg[0][1].y;

      // Condition 1: Leg Position
      const sideKneeAngleThreshold = (state === 0)? sideKneeAngleThreshold0 : sideKneeAngleThreshold1;

      doubleAngleController(sideKneeAngleThreshold, isLeftSide,
        poseLandmarks.leftLeg, poseLandmarks.rightLeg, poseLandmarks.legConnector, drawingUtils, ctx,
        handleFeedbackTexts, perspective, "sideLegInfo")

      // Condition 2: Hip Position
      shiftController(poseLandmarks.hip[0][0].x, poseLandmarks.hip[0][1].x, sideHipThreshold,
        poseLandmarks.hip, poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts,
        perspective, "sideHipInfo");

      // Condition 3: Upper Body Position
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
      // Condition 1: Leg Position
      doubleAlignmentController(poseLandmarks.leftLeg[0][0].x, poseLandmarks.leftLeg[0][1].x, poseLandmarks.leftLeg[0][2].x,
        poseLandmarks.rightLeg[0][0].x, poseLandmarks.rightLeg[0][1].x, poseLandmarks.rightLeg[0][2].x,
        backLegThreshold, poseLandmarks.leftLeg, poseLandmarks.rightLeg, poseLandmarks.legConnector, drawingUtils,
        handleFeedbackTexts, perspective, "backLegInfo")

      // Condition 2: Hip Position
      shiftController(poseLandmarks.hip[0][0].y, poseLandmarks.hip[0][1].y, backHipThreshold,
        poseLandmarks.hip, poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts,
        perspective, "backHipInfo");

      // Condition 3: Upper Body Position
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