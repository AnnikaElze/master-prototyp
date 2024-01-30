import {angleOverlay, skeletonOverlay, targetOverlay} from "./poseOverlays";

const red = '#D32F2F90';
const redOpaque = '#D32F2F';
const green = '#689F3890';
const greenOpaque = '#689F38';

export function angleController (threshold, isLeftSide, landmarks, connector,
                                 drawingUtils, ctx, handleFeedbackTexts, perspective, feedback) {

  const firstLimb = {
    x: landmarks[0][0].x - landmarks[0][1].x,
    y: landmarks[0][0].y - landmarks[0][1].y,
  }

  const secondLimb = {
    x: landmarks[0][2].x - landmarks[0][1].x,
    y: landmarks[0][2].y - landmarks[0][1].y,
  }

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