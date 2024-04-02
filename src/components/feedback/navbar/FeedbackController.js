import FeedbackTypeController from "./FeedbackTypeController";
import CameraSelection from "./CameraSelection";

/** Component overview
 * The FeedbackController component organizes control elements
 *
 * Used components
 * - Camera Selection
 * - FeedbackTypeController
 */

function FeedbackController (props) {
  return(
    <>
      <div className="headerGridItem">
        <div className="controllerGrid">
          {/* Camera Selection for perspective 1 and 2 */}
          <div className="headerEnd">
            <CameraSelection
              selectionId={1}
              handleCamera={props.handleCamera1}
              camera={props.camera1}
            />
            <CameraSelection
              selectionId={2}
              handleCamera={props.handleCamera2}
              camera={props.camera2}
            />
          </div>
          {/* De-/activation of Feedback Types */}
          <div  className="headerEnd">
            <FeedbackTypeController
              feedbackTypes={props.feedbackTypes}
              handleFeedbackType={props.handleFeedbackType}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default FeedbackController;