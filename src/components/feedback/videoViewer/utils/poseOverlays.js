export function skeletonOverlay (color, landmarks, connector, drawingUtils) {
  landmarks.forEach(landmark => {
    drawingUtils.drawConnectors(landmark, connector, {color: color, lineWidth: 1.5});
    drawingUtils.drawLandmarks(landmark, {color: 'white', radius: 2.5});
  });
}

export function angleOverlay (color, isCounterclockwise, landmarks, connector, drawingUtils, ctx) {
  const radius = 20;

  ctx.beginPath();
  ctx.moveTo(landmarks[0][1].x * ctx.canvas.width, landmarks[0][1].y * ctx.canvas.height);
  ctx.arc(landmarks[0][1].x * ctx.canvas.width, landmarks[0][1].y * ctx.canvas.height, radius,
    Math.atan2(landmarks[0][0].y - landmarks[0][1].y, landmarks[0][0].x - landmarks[0][1].x),
    Math.atan2(landmarks[0][2].y - landmarks[0][1].y, landmarks[0][2].x - landmarks[0][1].x),
    isCounterclockwise);
  ctx.lineTo(landmarks[0][1].x * ctx.canvas.width, landmarks[0][1].y * ctx.canvas.height);
  ctx.fillStyle = color;
  ctx.fill();

  landmarks.forEach(landmark => {
    drawingUtils.drawConnectors(landmark, connector, {color: 'white', lineWidth: 1.5});
    drawingUtils.drawLandmarks(landmark, {color: 'white', radius: 2.5});
  });
}

export function targetOverlay (isArrow, color, start, target, ctx) {
  const startX = start.x * ctx.canvas.width;
  const startY = start.y * ctx.canvas.height;

  const targetX = target.x * ctx.canvas.width;
  const targetY = target.y * ctx.canvas.height;

  drawPosition(targetX, targetY, '#689F3890', ctx)

  if (isArrow) {
    drawPosition(startX, startY, color, ctx);
    drawArrow(startX, startY, targetX, targetY, ctx)
  }
}

export function doubleTargetOverlay (isArrow, color, start1, start2, target, ctx){
  const start1X = start1.x * ctx.canvas.width;
  const start1Y = start1.y * ctx.canvas.height;

  const start2X = start2.x * ctx.canvas.width;
  const start2Y = start2.y * ctx.canvas.height;

  const targetX = target.x * ctx.canvas.width;
  const targetY = target.y * ctx.canvas.height;

  drawPosition(targetX, targetY, '#689F3890', ctx);

  if (isArrow) {
    drawPosition(start1X, start1Y, color, ctx);
    drawPosition(start2X, start2Y, color, ctx);
    drawArrow(start1X, start1Y, targetX, targetY, ctx);
    drawArrow(start2X, start2Y, targetX, targetY, ctx);
  }
}

function drawPosition (x, y, color, ctx) {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawArrow (startX, startY, targetX, targetY, ctx) {
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