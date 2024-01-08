import PoseLandmarks from "./PoseLandmarks";

function FeedbackVideo (props) {

  return(
    <>
      <div className="feedbackGridVideo">
        <div className="feedbackGridVideoItem">
          <PoseLandmarks video={1} feedbackTypes={props.feedbackTypes}/>
        </div>
        <div className="feedbackGridVideoItem">
          <PoseLandmarks video={2} feedbackTypes={props.feedbackTypes}/>
        </div>
      </div>
    </>
  )
}

export default FeedbackVideo;