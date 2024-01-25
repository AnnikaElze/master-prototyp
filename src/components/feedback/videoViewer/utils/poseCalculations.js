import * as THREE from "three";

export function sideKneeAngleCalculation (poseLandmarks) {
  const hip = new THREE.Vector3(poseLandmarks[0][0].x,
    poseLandmarks[0][0].y, poseLandmarks[0][0].z);
  const knee = new THREE.Vector3(poseLandmarks[0][1].x,
    poseLandmarks[0][1].y, poseLandmarks[0][1].z);
  const foot = new THREE.Vector3(poseLandmarks[0][2].x,
    poseLandmarks[0][2].y, poseLandmarks[0][2].z);

  const kneeHip = knee.clone().sub(hip);
  const kneeFoot = knee.clone().sub(foot);

  kneeHip.normalize();
  kneeFoot.normalize();

  const angleInRadians = kneeHip.angleTo(kneeFoot);

  return THREE.MathUtils.radToDeg(angleInRadians);
}

export function sideHipCalculation (leftHip, rightHip) {
  return Math.abs(leftHip.x - rightHip.x);
}

export function sideBodyCalculation (hipCenter, shoulderCenter) {

  return Math.abs(hipCenter.x - shoulderCenter.x);
}