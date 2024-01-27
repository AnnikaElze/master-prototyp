import BodyLandmarks from "./videoViewer/BodyLandmarks";
import {useRef} from "react";
import {DrawingUtils} from "@mediapipe/tasks-vision";
import LungeConditions from "./videoViewer/utils/lungeConditions";
import HandstandConditions from "./videoViewer/utils/handstandConditions";

function VideoViewer (props) {
  const canvasRef = useRef(null);
  function DrawLandmarks (landmarks) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.canvas.width = Math.floor(window.innerWidth * 0.485);
    ctx.canvas.height = Math.floor(window.innerHeight * 0.55);

    const drawingUtils = new DrawingUtils(ctx);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (props.usecase === "Quadrizeps Dehnung") {
      LungeConditions(ctx, drawingUtils, props.perspective, landmarks, props.handleFeedbackTexts);
    } else {
      HandstandConditions(ctx, drawingUtils, props.perspective, landmarks, props.handleFeedbackTexts);
    }
  }

  function Overlay (feedbackTypes) {
    if (feedbackTypes.includes('overlay') && props.usecase === "Quadrizeps Dehnung" && props.excersiseState !== true) {
      return "feedbackCanvas"
    } else return "feedbackCanvasDisabled"
  }

  return (
    <>
      <BodyLandmarks camera={props.camera} drawLandmarks={DrawLandmarks}/>
      <canvas ref={canvasRef} className={Overlay(props.feedbackTypes)}></canvas>
    </>
  )

}

export default VideoViewer;