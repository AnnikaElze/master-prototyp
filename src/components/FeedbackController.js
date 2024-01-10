import FeedbackTypeController from "./controller/FeedbackTypeController";
import CameraSelection from "./controller/CameraSelection";

function FeedbackController (props) {
  return(
    <>
      <div className="feedbackGridController">
        <div className="feedbackGridControllerItem">
          <CameraSelection selectionId={1} handleCamera={props.handleCamera1} camera={props.camera1}/>
          <CameraSelection selectionId={2} handleCamera={props.handleCamera2} camera={props.camera2}/>
          <FeedbackTypeController feedbackTypes={props.feedbackTypes} handleFeedbackType={props.handleFeedbackType}/>
        </div>
      </div>
    </>
  )
}



export default FeedbackController;