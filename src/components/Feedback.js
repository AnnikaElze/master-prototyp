import FeedbackHeader from "./FeedbackHeader";
import FeedbackViewer from "./FeedbackViewer";
import FeedbackController from "./FeedbackController";
import FeedbackVideo from "./FeedbackVideo";
import React, {useState} from "react";

function Feedback (props) {
  const [feedbackTypes, setFeedbackTypes] = useState(() => ['overlay', 'text', 'audio', 'signal']);
  const [camera1, setCamera1] = useState();
  const [camera2, setCamera2] = useState();

  const handleFeedbackType = (event, newFeedbackType) => {
    setFeedbackTypes(newFeedbackType);
  };

  const handleCamera1 = (event) => {
    setCamera1(event.target.value);
  };

  const handleCamera2 = (event) => {
    setCamera2(event.target.value);
  };

  return(
    <>
      <div className="feedbackGrid">
        <FeedbackHeader handleRoot={props.handleRoot} usecase={props.usecase}/>
        <FeedbackVideo usecase={props.usecase} feedbackTypes={feedbackTypes} camera1={camera1} camera2={camera2}/>
        <FeedbackViewer usecase={props.usecase} feedbackTypes={feedbackTypes}/>
        <FeedbackController usecase={props.usecase} feedbackTypes={feedbackTypes} handleFeedbackType={handleFeedbackType}
                            handleCamera1={handleCamera1} camera1={camera1}
                            handleCamera2={handleCamera2} camera2={camera2}/>
      </div>
    </>
  )
}

export default Feedback;