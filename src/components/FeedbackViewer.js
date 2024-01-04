import FeedbackTextFile from "./FeedbackTextFile";

function FeedbackViewer (props) {
  return(
    <>
      <div className="feedbackGridViewer">
        <div className="feedbackGridViewerItem" id="feedbackViewer1">
          <div className="feedbackText">
            <FeedbackTextFile severity={"warning"} info={"Hallo du kranke Nudel!"}/>
          </div>
          <div className="feedbackText">
            <FeedbackTextFile severity={"info"} info={"Hallo du kranke Nudel!"}/>
          </div>
        </div>
        <div className="feedbackGridViewerItem" id="feedbackViewer2">
          <div className="feedbackText">
            <FeedbackTextFile severity={"success"} info={"Hallo du kranke Nudel!"}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeedbackViewer;