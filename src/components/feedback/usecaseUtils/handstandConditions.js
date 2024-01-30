import PoseLandmarks from "../videoViewer/utils/poseLandmarks";
import {shiftController, straightController, targetController} from "../videoViewer/utils/poseCalculations";

export default function handstandConditions (ctx, drawingUtils, perspective, bodyLandmarks, handleFeedbackTexts, exerciseState) {
  //Thresholds
  const straightThreshold = 0.05;
  const targetThreshold = 0.05;
  const shiftThreshold = 0.05;

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

      }
      // State 3: Handstand
      else if (exerciseState === 2) {
        // Condition 1: Arm Position

        // Condition 2: Shoulder Position

        // Condition 3: Hip Position

        // Condition 4: Leg Position

        // Condition 5: Feet Position

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
        // Condition 1: Arm Position

        // Condition 2: Shoulder Position

        // Condition 3: Hip Position

        // Condition 4: Leg Position

        // Condition 5: Feet Position

      }
    }
  }
}