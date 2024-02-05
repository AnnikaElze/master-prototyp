import PoseLandmarks from "../videoViewer/utils/poseLandmarks";
import {
  advancedAlignmentController,
  alignmentController, doubleAlignmentController,
  doubleTargetController,
  momentumController,
  shiftController,
  targetController
} from "../videoViewer/utils/poseCalculations";

export default function handstandConditions (ctx, drawingUtils, perspective, bodyLandmarks, handleFeedbackTexts, exerciseState) {
  //Thresholds
  const straightThreshold = 0.02;
  const targetThreshold = 0.02;
  const shiftThreshold = 0.02;
  const momentumThreshold = 0.05;

  const poseLandmarks = PoseLandmarks(bodyLandmarks);

  if (bodyLandmarks[0] !== undefined) {
    const floorArm = (poseLandmarks.leftArm[0][2].y > poseLandmarks.leftArm[0][0].y)? poseLandmarks.leftArm :  poseLandmarks.rightArm;
    const floorLeg =  (poseLandmarks.leftArm[0][2].y > poseLandmarks.leftArm[0][0].y)? poseLandmarks.leftLeg :  poseLandmarks.rightLeg;

    // Perspective 1: Side view
    if (perspective === 1){
      // State 1: Starting Position
      if (exerciseState === 0) {

        // Condition 1: Arm Position
        alignmentController(floorArm[0][0].x, floorArm[0][1].x, floorArm[0][2].x, straightThreshold, floorArm,
          poseLandmarks.armConnector, drawingUtils, handleFeedbackTexts, perspective, "state1sideArmInfo")

        // Condition 2: Shoulder Position

        const target = {
          x: floorArm[0][2].x,
          y: floorArm[0][0].y,
          z: floorArm[0][0].z,
        }

        targetController(floorArm[0][2].x, floorArm[0][0].x, targetThreshold, floorArm[0][0], target, ctx,
          handleFeedbackTexts, perspective, "state1sideShoulderInfo")

      }
      // State 2: Dynamic movement
      else if (exerciseState === 1) {
        // Condition 1: Feet Target
        momentumController(momentumThreshold, poseLandmarks.hipCenter[0][0].y, poseLandmarks.feetCenter[0][0].y,
          handleFeedbackTexts, perspective, "state2")
      }
      // State 3: Handstand
      else if (exerciseState === 2) {
        // Condition 1: Body Position
        const frontBody = [[
          floorArm[0][2],
          floorArm[0][1],
          floorArm[0][0],
          floorLeg[0][0]
        ]]

        const frontBodyConnector = [
          {start: 0, end: 1},
          {start: 1, end: 2},
          {start: 2, end: 3},
          {start: 3, end: 4},
        ]

        advancedAlignmentController(frontBody[0][0].x, frontBody[0][1].x, frontBody[0][2].x, frontBody[0][3].x,
          shiftThreshold, frontBody,frontBodyConnector, drawingUtils,
          handleFeedbackTexts, perspective, "state3sideBodyInfo")

        // Condition 2: Leg Position
        doubleAlignmentController(poseLandmarks.leftLeg[0][0].x, poseLandmarks.leftLeg[0][1].x, poseLandmarks.leftLeg[0][2].x,
          poseLandmarks.rightLeg[0][0].x, poseLandmarks.rightLeg[0][1].x, poseLandmarks.rightLeg[0][2].x,
          straightThreshold, poseLandmarks.leftLeg, poseLandmarks.rightLeg, poseLandmarks.legConnector, drawingUtils,
          handleFeedbackTexts, perspective, "state3sideLegInfo")

        // Condition 3: Feet Position
        const feetTarget = {
          x: poseLandmarks.shoulderCenter[0][0].x,
          y: poseLandmarks.feetCenter[0][0].y,
          z: poseLandmarks.feetCenter[0][0].z,
        }

        doubleTargetController(poseLandmarks.shoulderCenter[0][0].x, poseLandmarks.leftLeg[0][2].x, poseLandmarks.rightLeg[0][2].x,
          targetThreshold, feetTarget, poseLandmarks.rightLeg[0][2], poseLandmarks.rightLeg[0][2],
          ctx, handleFeedbackTexts, perspective, "state3sideFeetInfo")

      }
    }

    // Perspective 2: Back view
    else {
      // State 1: Starting Position
      if (exerciseState === 0) {
        // Condition 1: Arm Position
        const target = {
          x: floorArm[0][0].x,
          y: floorArm[0][2].y,
          z: floorArm[0][2].z,
        }

        targetController(floorArm[0][0].x, floorArm[0][2].x, targetThreshold, floorArm[0][2], target, ctx,
          handleFeedbackTexts, perspective, "state1backArmInfo")

        // Condition 2: Shoulder Position
        shiftController(poseLandmarks.shoulders[0][0].y, poseLandmarks.shoulders[0][1].y, shiftThreshold, poseLandmarks.shoulders,
          poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts, perspective, "state1backShoulderInfo")

      }
      // State 2: Dynamic movement
      else if (exerciseState === 1) {
        // Condition 1: Feet Target
      }
      // State 3: Handstand
      else if (exerciseState === 2) {
        // Condition 1: Shoulder Position
        shiftController(poseLandmarks.shoulders[0][0].y, poseLandmarks.shoulders[0][1].y, shiftThreshold, poseLandmarks.shoulders,
          poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts, perspective, "state3backShoulderInfo")

        // Condition 2: Hip Position
        shiftController(poseLandmarks.shoulderCenter[0][0].x, poseLandmarks.hipCenter[0][0].x, shiftThreshold, poseLandmarks.body,
          poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts, perspective, "state3backHipInfo")

        // Condition 3: Feet Position
        const feetTarget = {
          x: poseLandmarks.shoulderCenter[0][0].x,
          y: poseLandmarks.feetCenter[0][0].y,
          z: poseLandmarks.feetCenter[0][0].z,
        }

        doubleTargetController(poseLandmarks.shoulderCenter[0][0].x, poseLandmarks.leftLeg[0][2].x, poseLandmarks.rightLeg[0][2].x,
          targetThreshold, feetTarget, poseLandmarks.rightLeg[0][2], poseLandmarks.rightLeg[0][2],
          ctx, handleFeedbackTexts, perspective, "state3backFeetInfo")
      }
    }
  }
}