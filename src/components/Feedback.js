import FeedbackHeader from "./FeedbackHeader";
import FeedbackViewer from "./FeedbackViewer";
import React, {useState} from "react";
import PoseLandmarks from "./overlay/PoseLandmarks";
import Button from "@mui/material/Button";

function Feedback (props) {
  const [feedbackTypes, setFeedbackTypes] = useState(() => ['overlay', 'text', 'audio', 'signal']);
  const [camera1, setCamera1] = useState();
  const [camera2, setCamera2] = useState();
  const [reset1, setReset1] = useState(false);
  const [reset2, setReset2] = useState(false);

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

  function loadVideo(videoID, cameraID, isReset) {
    if (isReset) {
      return null;
    } else {
      return (
        <PoseLandmarks video={videoID} feedbackTypes={feedbackTypes} camera={cameraID}/>
      )
    }
  }

  return(
    <>
      <FeedbackHeader handleRoot={props.handleRoot} usecase={props.usecase}
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
      <FeedbackViewer usecase={props.usecase} feedbackTypes={feedbackTypes}/>
    </>
  )
}

export default Feedback;