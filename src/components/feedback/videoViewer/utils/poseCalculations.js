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

export function angleController (threshold, isLeftSide, landmarks, connector,
                                 drawingUtils, ctx, handleFeedbackTexts, perspective, feedback) {

  const firstLimb = limbCalculation(landmarks[0][0], landmarks[0][1])
  const secondLimb = limbCalculation(landmarks[0][2], landmarks[0][1])

  const scalarProduct = firstLimb.x * secondLimb.x + firstLimb.y * secondLimb.y;

  if (Math.abs(scalarProduct) > threshold) {
    angleOverlay(red, isLeftSide, landmarks, connector, drawingUtils, ctx);
    handleFeedbackTexts(perspective, feedback, "warning");
  } else {
    angleOverlay(green, isLeftSide, landmarks, connector, drawingUtils, ctx);
    handleFeedbackTexts(perspective, feedback, "success");
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

export function straightController (threshold, landmarks, connector, drawingUtils, ctx,
                                    handleFeedbackTexts, perspective, feedback) {

  const firstLimb = limbCalculation(landmarks[0][0], landmarks[0][1])
  const secondLimb = limbCalculation(landmarks[0][2], landmarks[0][1])

  const scalarProduct = firstLimb.x * secondLimb.x + firstLimb.y * secondLimb.y;
  const amountProduct = Math.sqrt(Math.pow(firstLimb.x, 2) + Math.pow(firstLimb.y, 2))
    * Math.sqrt(Math.pow(secondLimb.x, 2) + Math.pow(secondLimb.y, 2))

  const cos = 1 - Math.abs(scalarProduct/amountProduct);

  if (cos > threshold) {
    skeletonOverlay(redOpaque, landmarks,connector,drawingUtils)
    handleFeedbackTexts(perspective, feedback, "warning");
  } else {
    skeletonOverlay(greenOpaque, landmarks,connector,drawingUtils)
    handleFeedbackTexts(perspective, feedback, "success");
  }
}

export function momentumController (threshold, center, start, handleFeedbackTexts, perspective, feedback){
  if (center.y < start.y - threshold) {
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