export default function kneeAngleOverlay (kneeAngle, kneeAngleMin, kneeAngleMax, landmarks, connector, drawingUtils) {
  if (kneeAngle > kneeAngleMax || kneeAngle < kneeAngleMin) {
    landmarks.forEach(landmark => {
      drawingUtils.drawConnectors(landmark, connector, {color: 'red', lineWidth: 1});
      drawingUtils.drawLandmarks(landmark, {color: 'red', radius: 1});
    });
  } else {
    landmarks.forEach(landmark => {
      drawingUtils.drawConnectors(landmark, connector, {color: 'green', lineWidth: 1});
      drawingUtils.drawLandmarks(landmark, {color: 'green', radius: 1});
    });
  }
}