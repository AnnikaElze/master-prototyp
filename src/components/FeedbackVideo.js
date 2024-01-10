import PoseLandmarks from "./overlay/PoseLandmarks";

function FeedbackVideo (props) {

  return(
    <>
      <div className="feedbackGridVideo">
        <div className="feedbackGridVideoItem">
          <PoseLandmarks video={1} feedbackTypes={props.feedbackTypes} camera={props.camera1}/>
        </div>
        <div className="feedbackGridVideoItem">
          <PoseLandmarks video={2} feedbackTypes={props.feedbackTypes} camera={props.camera2}/>
        </div>
      </div>
    </>
  )
}

export default FeedbackVideo;