import FeedbackHeader from "./FeedbackHeader";
import FeedbackViewer from "./FeedbackViewer";
import FeedbackController from "./FeedbackController";
import FeedbackVideo from "./FeedbackVideo";
import {useState} from "react";

function Feedback (props) {
  const [feedbackTypes, setFeedbackTypes] = useState(() => ['overlay', 'text', 'audio', 'signal']);

  const handleFeedbackType = (event, newFeedbackType) => {
    setFeedbackTypes(newFeedbackType);
  };

  return(
    <>
      <div className="feedbackGrid">
        <FeedbackHeader handleRoot={props.handleRoot} usecase={props.usecase}/>
        <FeedbackVideo usecase={props.usecase}/>
        <FeedbackViewer usecase={props.usecase}/>
        <FeedbackController usecase={props.usecase} feedbackTypes={feedbackTypes} handleFeedbackType={handleFeedbackType}/>
      </div>
    </>
  )
}

export default Feedback;