import PoseLandmarks from "../videoViewer/utils/poseLandmarks";
import {
  doubleTargetController,
  momentumController,
  shiftController,
  straightController,
  targetController
} from "../videoViewer/utils/poseCalculations";

export default function handstandConditions (ctx, drawingUtils, perspective, bodyLandmarks, handleFeedbackTexts, exerciseState) {
  //Thresholds
  const straightThreshold = 0.1;
  const targetThreshold = 0.05;
  const shiftThreshold = 0.05;
  const momentumThreshold = 0.05;

  const poseLandmarks = PoseLandmarks(bodyLandmarks);

  if (bodyLandmarks[0] !== undefined) {
    const floorArm = (poseLandmarks.leftArm[0][2].y < poseLandmarks.leftArm[0][0].y)? poseLandmarks.leftArm :  poseLandmarks.rightArm;
    const poleArm = (poseLandmarks.leftArm[0][2].y < poseLandmarks.leftArm[0][0].y)? poseLandmarks.leftArm :  poseLandmarks.rightArm;

    // Perspective 1: Side view
    if (perspective === 1){
      // State 1: Starting Position
      if (exerciseState === 0) {

        // Condition 1: Arm Position
        straightController(straightThreshold, floorArm, poseLandmarks.armConnector,
          drawingUtils, ctx, handleFeedbackTexts, perspective, "state1sideArmInfo")

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
        momentumController(momentumThreshold, poseLandmarks.hipCenter[0][0], poseLandmarks.feetCenter[0][0],
          handleFeedbackTexts, perspective, "state2")
      }
      // State 3: Handstand
      else if (exerciseState === 2) {
        // Condition 1: Arm Position
        straightController(straightThreshold, floorArm, poseLandmarks.armConnector,
          drawingUtils, ctx, handleFeedbackTexts, perspective, "state3sideArmInfo")

        // Condition 2: Shoulder Position
        const shoulderTarget = {
          x: floorArm[0][2].x,
          y: floorArm[0][0].y,
          z: floorArm[0][0].z,
        }

        targetController(floorArm[0][2].x, floorArm[0][0].x, targetThreshold, floorArm[0][0], shoulderTarget, ctx,
          handleFeedbackTexts, perspective, "state3sideShoulderInfo")

        // Condition 3: Hip Position
        const hipTarget = {
          x: floorArm[0][2].x,
          y: poseLandmarks.hipCenter[0][0].y,
          z: poseLandmarks.hipCenter[0][0].z,
        }

        targetController(floorArm[0][2].x, poseLandmarks.hipCenter[0][0].x, targetThreshold,
          poseLandmarks.hipCenter[0][0], hipTarget, ctx,
          handleFeedbackTexts, perspective, "state3sideHipInfo")

        // Condition 4: Leg Position
        straightController(straightThreshold, poseLandmarks.leftLeg, poseLandmarks.legConnector,
          drawingUtils, ctx, handleFeedbackTexts, perspective, "state3sideLeftLegInfo");
        straightController(straightThreshold, poseLandmarks.rightLeg, poseLandmarks.legConnector,
          drawingUtils, ctx, handleFeedbackTexts, perspective, "state3sideRightLegInfo");

        // Condition 5: Feet Position
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
      // State 3: Handstand
      else if (exerciseState === 2) {
        // Condition 1: Arm Position

        // Condition 2: Shoulder Position
        shiftController(poseLandmarks.shoulders[0][0].y, poseLandmarks.shoulders[0][1].y, shiftThreshold, poseLandmarks.shoulders,
          poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts, perspective, "state3backShoulderInfo")

        // Condition 3: Hip Position
        shiftController(poseLandmarks.shoulderCenter[0][0].x, poseLandmarks.hipCenter[0][0].x, shiftThreshold, poseLandmarks.body,
          poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts, perspective, "state3backHipInfo")

        // Condition 5: Feet Position
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