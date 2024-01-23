import FeedbackTypeController from "./FeedbackTypeController";
import CameraSelection from "./CameraSelection";

function FeedbackController (props) {
  return(
    <>
      <div className="headerGridItem">
        <div className="controllerGrid">
          <div className="headerEnd">
            <CameraSelection selectionId={1} handleCamera={props.handleCamera1} camera={props.camera1}/>
            <CameraSelection selectionId={2} handleCamera={props.handleCamera2} camera={props.camera2}/>
          </div>
          <div  className="headerEnd">
            <FeedbackTypeController feedbackTypes={props.feedbackTypes} handleFeedbackType={props.handleFeedbackType}/>
          </div>
        </div>
      </div>
    </>
  )
}



export default FeedbackController;