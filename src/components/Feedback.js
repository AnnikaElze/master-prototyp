import Navbar from "./feedback/Navbar";
import TextViewer from "./feedback/TextViewer";
import React, {useState} from "react";
import VideoViewer from "./feedback/VideoViewer";

function Feedback (props) {
  const [feedbackTypes, setFeedbackTypes] = useState(() => ['overlay', 'text', 'audio', 'signal']);
  const [camera1, setCamera1] = useState();
  const [camera2, setCamera2] = useState();
  const [reset1, setReset1] = useState(false);
  const [reset2, setReset2] = useState(false);

  const [exerciseState, setExerciseState] = useState(false);

  const [feedbackTexts1, setFeedbackTexts1] = useState({});
  const [feedbackTexts2, setFeedbackTexts2] = useState({});

  const handleFeedbackType = (event, newFeedbackType) => {
    setFeedbackTypes(newFeedbackType);
  };

  const handleCamera1 = (event) => {
    setCamera1(event.target.value);
    setReset1(true);
    setInterval(() => {
      setReset1(false);
    }, 1000);
  };

  const handleCamera2 = (event) => {
    setCamera2(event.target.value);
    setReset2(true);
    setInterval(() => {
      setReset2(false);
    }, 3000);
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

  const handleExerciseState = (state) => {
    setExerciseState(state);
  }

  function loadVideo(perspective, cameraID, isReset) {
    if (isReset) {
      return null;
    } else {
      return (
        <VideoViewer perspective={perspective} feedbackTypes={feedbackTypes} usecase={props.usecase} camera={cameraID}
                     handleFeedbackTexts={handleFeedbackTexts} excersiseState={exerciseState}/>
      )
    }
  }

  function feedbackDecision () {
    if (feedbackTypes.includes('text')) {
      return (
        <>
          <div className="feedbackGridViewer">
            <div className="feedbackGridViewerItem" id="feedbackViewer1">
              <TextViewer feedbackTexts={feedbackTexts1} controlfeedbackTexts={feedbackTexts2}
                          usecase={props.usecase} handleExerciseState={handleExerciseState}
                          exerciseState={exerciseState} textViewer={1}/>
            </div>
            <div className="feedbackGridViewerItem" id="feedbackViewer2">
              <TextViewer feedbackTexts={feedbackTexts2} controlfeedbackTexts={feedbackTexts1}
                          usecase={props.usecase} handleExerciseState={handleExerciseState}
                          exerciseState={exerciseState} textViewer={2}/>
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
              handleCamera1={handleCamera1} camera1={camera1}
              handleCamera2={handleCamera2} camera2={camera2}/>
      <div className="feedbackGridVideo">
        <div className="feedbackGridVideoItem">
          {loadVideo(1, camera1, reset1)}
        </div>
        <div className="feedbackGridVideoItem">
          {loadVideo(2, camera2, reset2)}
        </div>
      </div>
      {feedbackDecision()}
    </>
  )
}

export default Feedback;