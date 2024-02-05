import {
  angleOverlay,
  doubleTargetOverlay,
  skeletonOverlay,
  targetOverlay
} from "./poseOverlays";

const red = '#D32F2F90';
const redOpaque = '#D32F2F';
const green = '#689F3890';
const greenOpaque = '#689F38';

export function doubleAngleController (threshold, isLeftSide, landmarks1, landmarks2, connector,
                                 drawingUtils, ctx, handleFeedbackTexts, perspective, feedback) {

  const firstLimb1 = limbCalculation(landmarks1[0][0], landmarks1[0][1])
  const secondLimb1 = limbCalculation(landmarks1[0][2], landmarks1[0][1])

  const firstLimb2 = limbCalculation(landmarks2[0][0], landmarks2[0][1])
  const secondLimb2 = limbCalculation(landmarks2[0][2], landmarks2[0][1])

  const scalarProduct1 = firstLimb1.x * secondLimb1.x + firstLimb1.y * secondLimb1.y;
  const scalarProduct2 = firstLimb2.x * secondLimb2.x + firstLimb2.y * secondLimb2.y;

  if (Math.abs(scalarProduct1) > threshold) {
    angleOverlay(red, isLeftSide, landmarks1, connector, drawingUtils, ctx);
    handleFeedbackTexts(perspective, feedback, "warning");
    if (Math.abs(scalarProduct2) > threshold) {
      angleOverlay(red, isLeftSide, landmarks2, connector, drawingUtils, ctx);
    } else {
      angleOverlay(green, isLeftSide, landmarks2, connector, drawingUtils, ctx);
    }
  } else {
    angleOverlay(green, isLeftSide, landmarks1, connector, drawingUtils, ctx);
    if (Math.abs(scalarProduct2) > threshold) {
      angleOverlay(red, isLeftSide, landmarks2, connector, drawingUtils, ctx);
      handleFeedbackTexts(perspective, feedback, "warning");
    } else {
      angleOverlay(green, isLeftSide, landmarks2, connector, drawingUtils, ctx);
      handleFeedbackTexts(perspective, feedback, "success");
    }
  }

}

export function shiftController (a, b, threshold, landmarks, connector, drawingUtils,
                                 handleFeedbackTexts, perspective, feedback) {
  const shift = Math.abs(a - b);

  if (shift > threshold) {
    skeletonOverlay(redOpaque, landmarks, connector, drawingUtils);
    handleFeedbackTexts(perspective, feedback, "warning");
  } else {
    skeletonOverlay(greenOpaque, landmarks, connector, drawingUtils);
    handleFeedbackTexts(perspective, feedback, "success");
  }
}

export function alignmentController (a, b, c, threshold, landmarks, connector, drawingUtils,
                                     handleFeedbackTexts, perspective, feedback) {
  const shift1 = Math.abs(a - b);
  const shift2 = Math.abs(b - c);

  if (shift1 > threshold || shift2 > threshold) {
    skeletonOverlay(redOpaque, landmarks, connector, drawingUtils);
    handleFeedbackTexts(perspective, feedback, "warning");
  } else {
    skeletonOverlay(greenOpaque, landmarks, connector, drawingUtils);
    handleFeedbackTexts(perspective, feedback, "success");
  }
}

export function advancedAlignmentController (a, b, c, d, threshold, landmarks, connector, drawingUtils,
                                             handleFeedbackTexts, perspective, feedback) {
  const shift1 = Math.abs(a - b);
  const shift2 = Math.abs(b - c);
  const shift3 = Math.abs(c - d);

  if (shift1 > threshold || shift2 > threshold || shift3 > threshold) {
    skeletonOverlay(redOpaque, landmarks, connector, drawingUtils);
    handleFeedbackTexts(perspective, feedback, "warning");
  } else {
    skeletonOverlay(greenOpaque, landmarks, connector, drawingUtils);
    handleFeedbackTexts(perspective, feedback, "success");
  }
}

export function doubleAlignmentController (a1, b1, c1, a2, b2, c2, threshold, landmarks1, landmarks2, connector,
                                           drawingUtils, handleFeedbackTexts, perspective, feedback) {
  const shift11 = Math.abs(a1 - b1);
  const shift12 = Math.abs(b1 - c1);

  const shift21 = Math.abs(a2 - b2);
  const shift22 = Math.abs(b2 - c2);

  if (shift11 > threshold || shift12 > threshold) {
    skeletonOverlay(redOpaque, landmarks1, connector, drawingUtils);
    handleFeedbackTexts(perspective, feedback, "warning");
    if (shift21 > threshold || shift22 > threshold) {
      skeletonOverlay(redOpaque, landmarks2, connector, drawingUtils);
    } else {
      skeletonOverlay(greenOpaque, landmarks2, connector, drawingUtils);
    }
  } else {
    skeletonOverlay(greenOpaque, landmarks1, connector, drawingUtils);
    if (shift21 > threshold || shift22 > threshold) {
      skeletonOverlay(redOpaque, landmarks2, connector, drawingUtils);
      handleFeedbackTexts(perspective, feedback, "warning");
    } else {
      skeletonOverlay(greenOpaque, landmarks2, connector, drawingUtils);
      handleFeedbackTexts(perspective, feedback, "success");
    }
  }
}

export function targetController (referenceValue, targetValue, threshold, start, target, ctx,
                                  handleFeedbackTexts, perspective, feedback) {
  const shift = Math.abs(referenceValue - targetValue);

  if (shift > threshold) {
    targetOverlay(true, red, start, target, ctx);
    handleFeedbackTexts(perspective,  feedback, "warning");
  } else {
    targetOverlay(false, green, start, target, ctx);
    handleFeedbackTexts(perspective, feedback, "success");
  }
}

export function doubleTargetController (referenceValue, targetValue1, targetValue2, threshold, target, start1, start2,
                                        ctx, handleFeedbackTexts, perspective, feedback) {
  const shift1 = Math.abs(referenceValue - targetValue1);
  const shift2 = Math.abs(referenceValue - targetValue2);

  if (shift1 > threshold && shift2 > threshold) {
    doubleTargetOverlay(true, red, start1, start2, target, ctx);
    handleFeedbackTexts(perspective,  feedback, "warning");
  } else {
    doubleTargetOverlay(false, green, start1, start2, target, ctx);
    handleFeedbackTexts(perspective, feedback, "success");
  }
}

export function momentumController (threshold, center, limb, handleFeedbackTexts, perspective, feedback){
  if (center < limb) {
    handleFeedbackTexts(perspective, feedback, "warning");
  } else {
    handleFeedbackTexts(perspective, feedback, "success");
  }
}

function limbCalculation (end, start) {
  return {
    x: end.x - start.x,
    y: end.y - start.y,
  }
}