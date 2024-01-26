import * as THREE from "three";
import {angleOverlay, skeletonOverlay, targetOverlay} from "./poseOverlays";

const red = '#D32F2F90';
const redOpaque = '#D32F2F';
const green = '#689F3890';
const greenOpaque = '#689F38';

export function angleController (thresholdMax, thresholdMin, isLeftSide, landmarks, connector,
                                 drawingUtils, ctx, handleFeedbackTexts, info) {

  const firstJoint = new THREE.Vector3(landmarks[0][0].x,
    landmarks[0][0].y, landmarks[0][0].z);
  const centerJoint = new THREE.Vector3(landmarks[0][1].x,
    landmarks[0][1].y, landmarks[0][1].z);
  const secondJoint = new THREE.Vector3(landmarks[0][2].x,
    landmarks[0][2].y, landmarks[0][2].z);

  const firstLimb = centerJoint.clone().sub(firstJoint);
  const secondLimb = centerJoint.clone().sub(secondJoint);

  firstLimb.normalize();
  secondLimb.normalize();
  const angleInRadians = firstLimb.angleTo(secondLimb);
  const angleInDegrees = THREE.MathUtils.radToDeg(angleInRadians);

  if (angleInDegrees > thresholdMax || angleInDegrees < thresholdMin) {
    angleOverlay(red, isLeftSide, landmarks, connector, drawingUtils, ctx);
    handleFeedbackTexts("warning", info[0], info[1]);
  } else {
    angleOverlay(green, isLeftSide, landmarks, connector, drawingUtils, ctx);
    handleFeedbackTexts("success", info[1], info[0]);
  }

}

export function shiftController (a, b, threshold, landmarks, connector, drawingUtils,
                                 handleFeedbackTexts, info) {
  const shift = Math.abs(a - b);

  if (shift > threshold) {
    skeletonOverlay(redOpaque, landmarks, connector, drawingUtils);
    handleFeedbackTexts("warning", info[0], info[1]);
  } else {
    skeletonOverlay(greenOpaque, landmarks, connector, drawingUtils);
    handleFeedbackTexts("success", info[1], info[0]);
  }
}

export function targetController (referenceValue, targetValue, threshold, start, target, ctx,
                                  handleFeedbackTexts, info) {
  const shift = Math.abs(referenceValue - targetValue);

  if (shift > threshold) {
    targetOverlay(true, red, start, target, ctx);
    handleFeedbackTexts("warning", info[0], info[1]);
  } else {
    targetOverlay(false, green, start, target, ctx);
    handleFeedbackTexts("success", info[1], info[0]);
  }
}