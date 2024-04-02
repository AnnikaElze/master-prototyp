import {useRef} from "react";
import {DrawingUtils} from "@mediapipe/tasks-vision";
import lungeConditions from "./usecaseUtils/lungeConditions";
import handstandConditions from "./usecaseUtils/handstandConditions";
import BodyLandmarks0 from "./videoViewer/bodyLandmarker/BodyLandmarks0";
import BodyLandmarks1 from "./videoViewer/bodyLandmarker/BodyLandmarks1";
import BodyLandmarks2 from "./videoViewer/bodyLandmarker/BodyLandmarks2";

/** Component overview
 * The VideoViewer component acts as a bridge between the video and the overlay.
 * It renders the live video and overlay based on the usecase and exercise state.
 *
 * Created variables
 * - canvasRef
 * - ctx
 * - drawingUtils
 *
 * Used components
 * - BodyLandmarks
 *
 * Used files with helper functions
 * - lungeConditions
 * - handstandConditions
 */

function VideoViewer (props) {
  // Reference to the canvas element
  const canvasRef = useRef(null);

  // Functions to handle exercise states
  function handleState0 (landmarks) {
    DrawLandmarks(landmarks, 0);
  }
  function handleState1 (landmarks) {
    DrawLandmarks(landmarks, 1);
  }
  function handleState2 (landmarks) {
    DrawLandmarks(landmarks, 2);
  }

  // Function for determining whether video overlay needs to be displayed,
  // based on the active feedback types and the exercise state
  function Overlay (feedbackTypes) {
    if (feedbackTypes.includes('overlay')){
      if (props.usecase === "Quadrizeps Dehnung" && props.excerciseState === 2) {
        return "feedbackCanvasDisabled"
      } else if (props.usecase === "Pole Handstand" && props.excerciseState === 1) {
        return "feedbackCanvasDisabled"
      } else return "feedbackCanvas"
    } else return "feedbackCanvasDisabled"
  }

  // Function to draw landmarks on canvas (canvasRef)
  function DrawLandmarks (bodyLandmarks, state) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    ctx.canvas.width = Math.floor(window.innerWidth * 0.485);
    ctx.canvas.height = Math.floor(window.innerHeight * 0.55);

    // Initialize drawing utilities
    const drawingUtils = new DrawingUtils(ctx);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Functions to draw landmarks based on usecase and state
    if (props.usecase === "Quadrizeps Dehnung") {
      lungeConditions(ctx, drawingUtils, props.perspective, bodyLandmarks, props.handleFeedbackTexts, state);
    } else if (props.usecase === "Pole Handstand") {
      handstandConditions(ctx, drawingUtils, props.perspective, bodyLandmarks, props.handleFeedbackTexts, state);
    } else {
      // Setup usecase
      // -> following comments can be changed to uncommented to show all pose landmarks in setup screen
      // bodyLandmarks.forEach(landmark => {
      //   drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS, {color: 'white', lineWidth: 1.5});
      //   drawingUtils.drawLandmarks(landmark, {color: 'white', radius: 2.5});
      // });
    }
  }

  // Render BodyLandmarks Component and canvas for video overlay
  // The differentiation of the BodyLandmarkers is necessary here,
  // as no other way has been found to reload the BodyLandmarkers component.
  if (props.excerciseState === 0){
    return (
      <>
        <BodyLandmarks0
          camera={props.camera}
          handleState={handleState0}
        />
        <canvas ref={canvasRef} className={Overlay(props.feedbackTypes)}></canvas>
      </>
    )
  } else if (props.excerciseState === 1){
    return (
      <>
        <BodyLandmarks1
          camera={props.camera}
          handleState={handleState1}
        />
        <canvas ref={canvasRef} className={Overlay(props.feedbackTypes)}></canvas>
      </>
    )
  } else if (props.excerciseState === 2){
    return (
      <>
        <BodyLandmarks2
          camera={props.camera}
          handleState={handleState2}
        />
        <canvas ref={canvasRef} className={Overlay(props.feedbackTypes)}></canvas>
      </>
    )
  }


}

export default VideoViewer;