import Navbar from "./feedback/Navbar";
import TextViewer from "./feedback/TextViewer";
import React, {useState} from "react";
import VideoViewer from "./feedback/VideoViewer";
import sound from "../shared/media/countdown.mp3"

/** Component overview
 * The Feedback component is the central part for managing and providing feedback.
 * It organizes the UI elements and manages the state related to feedback reception and display.
 *
 * Created variables
 * - feedbackTypes
 * - exerciseState
 * - feedbackTexts1/2
 *
 * Used components
 * - Navbar
 * - VideoViewer
 * - TextViewer
 */

function Feedback (props) {
  // Active types of feedback (Video overlay, Text boxes, Audio signal)
  const [feedbackTypes, setFeedbackTypes] = useState(() => ['overlay', 'text', 'audio']);

  // Current state of the exercise
  const [exerciseState, setExerciseState] = useState(0);

  // Current feedback texts for perspective 1 and 2
  const [feedbackTexts1, setFeedbackTexts1] = useState({});
  const [feedbackTexts2, setFeedbackTexts2] = useState({});

  // Timer of for the first exercise state
  const [start, setStart] = useState(false);
  setInterval(() => {
    setStart(true);
  }, 15000);

  // Handle change in feedback type
  const handleFeedbackType = (event, newFeedbackType) => {
    setFeedbackTypes(newFeedbackType);
  };

  // Handle current feedback texts
  const handleFeedbackTexts = (perspective, feedback, type) => {
    // Update feedback texts based on perspective
    if (perspective === 1) {
      setFeedbackTexts1(prevState => ({
        ...prevState,
        [feedback]: type
      }));
    } else {
      setFeedbackTexts2(prevState => ({
        ...prevState,
        [feedback]: type
      }));
    }
  }

  // Handle change in exercise state
  const handleExerciseState = (newState, perspective) => {
    // Reset feedback texts when exercise state changes
    if (newState !== exerciseState){
      setFeedbackTexts1({});
      setFeedbackTexts2({});
      setExerciseState(newState);
      // Play audio when exercise state changes
      if (perspective === 1){
        const audio = new Audio(sound);
        audio.play();
      }
    }
  }

  // Load video component based on perspective
  function loadVideo(perspective, cameraID, isReset) {
    if (isReset) {
      return null; // If reset, return null
      // Updating the Karma ID takes longer than rendering the components.
      // As a result, the VideoViewer will not load correctly without this cooldown timer if a different
      // camera is selected.
    } else {
      // Otherwise, render VideoViewer component
      return (
        <VideoViewer
          perspective={perspective}
          feedbackTypes={feedbackTypes}
          usecase={props.usecase}
          camera={cameraID}
          handleFeedbackTexts={handleFeedbackTexts}
          excerciseState={exerciseState}
        />
      )
    }
  }

  // Determine if TextViewer is to render based on active feedback types
  function feedbackDecision () {
    if (feedbackTypes.includes('text')) {
      return (
        <>
          <div className="feedbackGridViewer">
            <div className="feedbackGridViewerItem" id="feedbackViewer1">
              <TextViewer
                feedbackTexts={feedbackTexts1}
                controlFeedbackTexts={feedbackTexts2}
                usecase={props.usecase}
                handleExerciseState={handleExerciseState}
                exerciseState={exerciseState}
                textViewer={1}
                start={start}
              />
            </div>
            <div className="feedbackGridViewerItem" id="feedbackViewer2">
              <TextViewer
                feedbackTexts={feedbackTexts2}
                controlFeedbackTexts={feedbackTexts1}
                usecase={props.usecase}
                handleExerciseState={handleExerciseState}
                exerciseState={exerciseState}
                textViewer={2}
                start={start}
              />
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="feedbackGridViewer">
          </div>
        </>
      )
    }
  }

  // render Navbar, VideoViewer and TextViewer
  return(
    <>
      <Navbar
        handleRoot={props.handleRoot}
        usecase={props.usecase}
        feedbackTypes={feedbackTypes}
        handleFeedbackType={handleFeedbackType}
        handleCamera1={props.handleCamera1}
        camera1={props.camera1}
        handleCamera2={props.handleCamera2}
        camera2={props.camera2}
      />
      <div className="feedbackGridVideo">
        <div className="feedbackGridVideoItem">
          {loadVideo(1, props.camera1, props.reset1)}
        </div>
        <div className="feedbackGridVideoItem">
          {loadVideo(2, props.camera2, props.reset2)}
        </div>
      </div>
      {feedbackDecision()}
    </>
  )
}

export default Feedback;