import PoseLandmarks from "../videoViewer/utils/poseLandmarks";
import {
  advancedAlignmentController,
  doubleAlignmentController,
  doubleTargetController,
  momentumController,
  shiftController, straightController,
  targetController
} from "../videoViewer/utils/poseCalculations";

export default function handstandConditions (ctx, drawingUtils, perspective, bodyLandmarks, handleFeedbackTexts, exerciseState) {
  //Thresholds State 1
  const sideArmThreshold0 = 15;
  const sideShoulderShift0 = 0.025;
  const sideShoulderThreshold0 = 0.02;
  const backHandThreshold0 = 0.01;
  const backShoulderThreshold0 = 0.06;

  //Thresholds State 2
  const momentumThreshold = 0.1;

  //Threshold State 3
  const sideBodyThreshold3 = 0.05;
  const sideLegThreshold3 = 0.05;
  const sideFeetThreshold3 = 0.02;
  const sideFeetShift = 0.025;
  const backShoulderThreshold3 = 0.04;
  const backHipThreshold3 = 0.02;
  const backFeetThreshold3 = 0.02;

  const poseLandmarks = PoseLandmarks(bodyLandmarks);

  if (bodyLandmarks[0] !== undefined) {
    const isLeft = poseLandmarks.leftArm[0][2].y > poseLandmarks.rightArm[0][2].y;

    const floorArm = isLeft? poseLandmarks.leftArm :  poseLandmarks.rightArm;
    const floorLeg =  isLeft? poseLandmarks.leftLeg :  poseLandmarks.rightLeg;
    const floorShoulderX = isLeft? (-1 * sideShoulderShift0) : sideShoulderShift0;

    // Perspective 1: Side view
    if (perspective === 1){
      // State 1: Starting Position
      if (exerciseState === 0) {

        // Condition 1: Arm Position
        straightController(floorArm, sideArmThreshold0, poseLandmarks.armConnector, drawingUtils,
          handleFeedbackTexts, perspective, "state1sideArmInfo")

        // Condition 2: Shoulder Position
        const target = {
          x: floorArm[0][2].x + floorShoulderX,
          y: floorArm[0][0].y,
          z: floorArm[0][0].z,
        }

        targetController(floorArm[0][2].x + floorShoulderX, floorArm[0][0].x, sideShoulderThreshold0, floorArm[0][0], target, ctx,
          handleFeedbackTexts, perspective, "state1sideShoulderInfo")


      }
      // State 2: Dynamic movement
      else if (exerciseState === 1) {
        // Condition 1: Feet Target
        momentumController(momentumThreshold, poseLandmarks.hipCenter[0][0].y, poseLandmarks.leftLeg[0][2].y,
          poseLandmarks.rightLeg[0][2].y, handleFeedbackTexts, perspective, "state2")
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
          sideBodyThreshold3, frontBody,frontBodyConnector, drawingUtils,
          handleFeedbackTexts, perspective, "state3sideBodyInfo")

        // Condition 2: Leg Position
        doubleAlignmentController(poseLandmarks.leftLeg[0][0].x, poseLandmarks.leftLeg[0][1].x, poseLandmarks.leftLeg[0][2].x,
          poseLandmarks.rightLeg[0][0].x, poseLandmarks.rightLeg[0][1].x, poseLandmarks.rightLeg[0][2].x,
          sideLegThreshold3, poseLandmarks.leftLeg, poseLandmarks.rightLeg, poseLandmarks.legConnector, drawingUtils,
          handleFeedbackTexts, perspective, "state3sideLegInfo")

        // Condition 3: Feet Position
        const feetShift = isLeft? sideFeetShift : (-1 * sideFeetShift);

        const feetTarget = {
          x: poseLandmarks.shoulderCenter[0][0].x + feetShift,
          y: poseLandmarks.feetCenter[0][0].y,
          z: poseLandmarks.feetCenter[0][0].z,
        }

        doubleTargetController(poseLandmarks.hipCenter[0][0].x + feetShift, poseLandmarks.leftLeg[0][2].x, poseLandmarks.rightLeg[0][2].x,
          sideFeetThreshold3, feetTarget, poseLandmarks.leftLeg[0][2], poseLandmarks.rightLeg[0][2],
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

        targetController(floorArm[0][0].x, floorArm[0][2].x, backHandThreshold0, floorArm[0][2], target, ctx,
          handleFeedbackTexts, perspective, "state1backArmInfo")

        // Condition 2: Shoulder Position
        shiftController(poseLandmarks.shoulders[0][0].y, poseLandmarks.shoulders[0][1].y, backShoulderThreshold0, poseLandmarks.shoulders,
          poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts, perspective, "state1backShoulderInfo")

      }
      // State 2: Dynamic movement
      else if (exerciseState === 1) {
        // Condition 1: Feet Target
      }
      // State 3: Handstand
      else if (exerciseState === 2) {
        // Condition 1: Shoulder Position
        shiftController(poseLandmarks.shoulders[0][0].y, poseLandmarks.shoulders[0][1].y, backShoulderThreshold3, poseLandmarks.shoulders,
          poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts, perspective, "state3backShoulderInfo")

        // Condition 2: Hip Position
        shiftController(poseLandmarks.shoulderCenter[0][0].x, poseLandmarks.hipCenter[0][0].x, backHipThreshold3, poseLandmarks.body,
          poseLandmarks.limbConnector, drawingUtils, handleFeedbackTexts, perspective, "state3backHipInfo")

        // Condition 3: Feet Position
        const feetTarget = {
          x: poseLandmarks.shoulderCenter[0][0].x,
          y: poseLandmarks.feetCenter[0][0].y,
          z: poseLandmarks.feetCenter[0][0].z,
        }

        doubleTargetController(poseLandmarks.shoulderCenter[0][0].x, poseLandmarks.leftLeg[0][2].x, poseLandmarks.rightLeg[0][2].x,
          backFeetThreshold3, feetTarget, poseLandmarks.leftLeg[0][2], poseLandmarks.rightLeg[0][2],
          ctx, handleFeedbackTexts, perspective, "state3backFeetInfo")
      }
    }
  }
}