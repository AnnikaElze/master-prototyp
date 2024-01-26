export function skeletonOverlay (color, landmarks, connector, drawingUtils) {
  landmarks.forEach(landmark => {
    drawingUtils.drawConnectors(landmark, connector, {color: color, lineWidth: 1.5});
    drawingUtils.drawLandmarks(landmark, {color: color, radius: 2.5});
  });
}

export function angleOverlay (color, isCounterclockwise, landmarks, connector, drawingUtils, ctx) {
  const radius = 15;

  ctx.beginPath();
  ctx.moveTo(landmarks[0][1].x * ctx.canvas.width, landmarks[0][1].y * ctx.canvas.height);
  ctx.arc(landmarks[0][1].x * ctx.canvas.width, landmarks[0][1].y * ctx.canvas.height, radius,
    Math.atan2(landmarks[0][0].y - landmarks[0][1].y, landmarks[0][0].x - landmarks[0][1].x),
    Math.atan2(landmarks[0][2].y - landmarks[0][1].y, landmarks[0][2].x - landmarks[0][1].x),
    isCounterclockwise);
  ctx.lineTo(landmarks[0][1].x * ctx.canvas.width, landmarks[0][1].y * ctx.canvas.height);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();

  landmarks.forEach(landmark => {
    drawingUtils.drawConnectors(landmark, connector, {color: 'white', lineWidth: 1.5});
    drawingUtils.drawLandmarks(landmark, {color: 'white', radius: 2});
  });
}

export function targetOverlay (isArrow, color, start, target, ctx) {
  const startX = start.x * ctx.canvas.width;
  const startY = start.y * ctx.canvas.height;

  const targetX = target.x * ctx.canvas.width;
  const targetY = target.y * ctx.canvas.height;

  ctx.beginPath();
  ctx.arc(startX, startY, 10, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(targetX, targetY, 10, 0, 2 * Math.PI);
  ctx.fillStyle = '#689F3890';
  ctx.fill();
  ctx.closePath();

  if (isArrow) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(targetX, targetY);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const angle = Math.atan2(targetY - startY, targetX - startX);
    ctx.beginPath();
    ctx.moveTo(targetX, targetY);
    ctx.lineTo(targetX - 10 * Math.cos(angle - Math.PI / 6), targetY - 10 * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(targetX - 10 * Math.cos(angle + Math.PI / 6), targetY - 10 * Math.sin(angle + Math.PI / 6));
    ctx.fillStyle = 'white';
    ctx.fill();
  }
}