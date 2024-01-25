export function skeletonOverlay (color, landmarks, connector, drawingUtils) {
  landmarks.forEach(landmark => {
    drawingUtils.drawConnectors(landmark, connector, {color: color, lineWidth: 1});
    drawingUtils.drawLandmarks(landmark, {color: color, radius: 1});
  });
}