import {useRef} from "react";
import {DrawingUtils, PoseLandmarker} from "@mediapipe/tasks-vision";
import lungeConditions from "./usecaseUtils/lungeConditions";
import handstandConditions from "./usecaseUtils/handstandConditions";
import BodyLandmarks0 from "./videoViewer/bodyLandmarker/BodyLandmarks0";
import BodyLandmarks1 from "./videoViewer/bodyLandmarker/BodyLandmarks1";
import BodyLandmarks2 from "./videoViewer/bodyLandmarker/BodyLandmarks2";

/**
 * @parent Feedback
 * @props perspective, feedbackTypes, usecase, camera, handleFeedbackTexts, exerciseState
 * @creats  canvasRef - for calling the canvas
 *          ctx - initializing the canvas context
 *          drawingUtils - initializing the DrawingUtils by mediapipe_task-vision
 * @helpfunctions lungeConditions | handstandConditions
 * @children BodyLandmarks
 * @return canvas overlay of the video
 */

function VideoViewer (props) {
  const canvasRef = useRef(null);

  function handleState0 (landmarks) {
    DrawLandmarks(landmarks, 0);
  }

  function handleState1 (landmarks) {
    DrawLandmarks(landmarks, 1);
  }

  function handleState2 (landmarks) {
    DrawLandmarks(landmarks, 2);
  }

  function Overlay (feedbackTypes) {
    if (feedbackTypes.includes('overlay')){
      if (props.usecase === "Quadrizeps Dehnung" && props.excerciseState === 2) {
        return "feedbackCanvasDisabled"
      } else if (props.usecase === "Pole Handstand" && props.excerciseState === 1) {
        return "feedbackCanvasDisabled"
      } else return "feedbackCanvas"
    } else return "feedbackCanvasDisabled"
  }

  function DrawLandmarks (bodyLandmarks, state) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.canvas.width = Math.floor(window.innerWidth * 0.485);
    ctx.canvas.height = Math.floor(window.innerHeight * 0.55);

    const drawingUtils = new DrawingUtils(ctx);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (props.usecase === "Quadrizeps Dehnung") {
      lungeConditions(ctx, drawingUtils, props.perspective, bodyLandmarks, props.handleFeedbackTexts, state);
    } else if (props.usecase === "Pole Handstand") {
      handstandConditions(ctx, drawingUtils, props.perspective, bodyLandmarks, props.handleFeedbackTexts, state);
    } else {
      // bodyLandmarks.forEach(landmark => {
      //   drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS, {color: 'white', lineWidth: 1.5});
      //   drawingUtils.drawLandmarks(landmark, {color: 'white', radius: 2.5});
      // });
    }
  }

  if (props.excerciseState === 0){
    return (
      <>
        <BodyLandmarks0 camera={props.camera} handleState={handleState0}/>
        <canvas ref={canvasRef} className={Overlay(props.feedbackTypes)}></canvas>
      </>
    )
  } else if (props.excerciseState === 1){
    return (
      <>
        <BodyLandmarks1 camera={props.camera} handleState={handleState1}/>
        <canvas ref={canvasRef} className={Overlay(props.feedbackTypes)}></canvas>
      </>
    )
  } else if (props.excerciseState === 2){
    return (
      <>
        <BodyLandmarks2 camera={props.camera} handleState={handleState2}/>
        <canvas ref={canvasRef} className={Overlay(props.feedbackTypes)}></canvas>
      </>
    )
  }


}

export default VideoViewer;