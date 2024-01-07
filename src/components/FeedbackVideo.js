import PoseLandmarks from "./PoseLandmarks";

function FeedbackVideo (props) {

  return(
    <>
      <div className="feedbackGridVideo">
        <div className="feedbackGridVideoItem">
          <PoseLandmarks video={1}/>
        </div>
        <div className="feedbackGridVideoItem">
          <PoseLandmarks video={2}/>
        </div>
      </div>
    </>
  )
}

export default FeedbackVideo;