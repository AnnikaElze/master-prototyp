import Navbar from "./feedback/Navbar";
import TextViewer from "./feedback/TextViewer";
import React, {useState} from "react";
import VideoViewer from "./feedback/VideoViewer";
import sound from "../shared/media/countdown.mp3"

/**
 * @parent App
 * @props handleRoot, usecase
 * @creats  feedbackTypes - for controlling which feedback elements are to be displayed (video overlay, text, signal)
 *          camera1, camera2 - id of the camera devices for video 1 and 2
 *          reset1, reset2 - for reset of video 1 and 2 when switching the camera device
 *          exerciseState - for tracking the current state of the execution of the current exercise
 *          feedbackTexts1, feedbackTexts2 - for tracking the current feedback states for video 1 and 2
 * @children Navbar, VideoViewer, TextViewer
 */

function Feedback (props) {
  const [feedbackTypes, setFeedbackTypes] = useState(() => ['overlay', 'text', 'audio']);

  const [exerciseState, setExerciseState] = useState(0);

  const [feedbackTexts1, setFeedbackTexts1] = useState({});
  const [feedbackTexts2, setFeedbackTexts2] = useState({});

  const [start, setStart] = useState(false);
  setInterval(() => {
    setStart(true);
  }, 10000);

  const handleFeedbackType = (event, newFeedbackType) => {
    setFeedbackTypes(newFeedbackType);
  };

  const handleFeedbackTexts = (perspective, feedback, type) => {
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

  const handleExerciseState = (newState, perspective) => {
    if (newState !== exerciseState){
      setFeedbackTexts1({});
      setFeedbackTexts2({});
      setExerciseState(newState);
      if (perspective === 1){
        const audio = new Audio(sound);
        audio.play();
      }
    }
  }

  function loadVideo(perspective, cameraID, isReset) {
    if (isReset) {
      return null;
    } else {
      return (
        <VideoViewer perspective={perspective} feedbackTypes={feedbackTypes} usecase={props.usecase} camera={cameraID}
                     handleFeedbackTexts={handleFeedbackTexts} excerciseState={exerciseState}/>
      )
    }
  }

  function feedbackDecision () {
    if (feedbackTypes.includes('text')) {
      return (
        <>
          <div className="feedbackGridViewer">
            <div className="feedbackGridViewerItem" id="feedbackViewer1">
              <TextViewer feedbackTexts={feedbackTexts1} controlFeedbackTexts={feedbackTexts2}
                          usecase={props.usecase} handleExerciseState={handleExerciseState}
                          exerciseState={exerciseState} textViewer={1} start={start}/>
            </div>
            <div className="feedbackGridViewerItem" id="feedbackViewer2">
              <TextViewer feedbackTexts={feedbackTexts2} controlFeedbackTexts={feedbackTexts1}
                          usecase={props.usecase} handleExerciseState={handleExerciseState}
                          exerciseState={exerciseState} textViewer={2} start={start}/>
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

  return(
    <>
      <Navbar handleRoot={props.handleRoot} usecase={props.usecase}
              feedbackTypes={feedbackTypes} handleFeedbackType={handleFeedbackType}
              handleCamera1={props.handleCamera1} camera1={props.camera1}
              handleCamera2={props.handleCamera2} camera2={props.camera2}/>
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