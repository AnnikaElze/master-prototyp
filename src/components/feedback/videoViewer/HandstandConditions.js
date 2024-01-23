import {PoseLandmarker} from "@mediapipe/tasks-vision";

function HandstandConditions (drawingUtils, perspective, landmarks) {
  // Perspective 1: Side view
  if (perspective === 1){

  }

  // Perspective 2: Back view
  else {

  }
}

export default HandstandConditions;

// Draw all Landmarks:
// landmarks.forEach(landmark => {
//       drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS, {color: 'white', lineWidth: 1});
//       drawingUtils.drawLandmarks(landmark, {color: 'white', radius: 1});
//     });