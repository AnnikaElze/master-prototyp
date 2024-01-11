import FeedbackTextFile from "./text/FeedbackTextFile";

function feedbackDecision (feedbackTypes) {
  if (feedbackTypes.includes('text')) {
    return (
      <>
        <div className="feedbackGridViewer">
          <div className="feedbackGridViewerItem" id="feedbackViewer1">
            <div className="feedbackText">
              <FeedbackTextFile type={"warning"} info={"Fehlerhinweis"}/>
            </div>
            <div className="feedbackText">
              <FeedbackTextFile type={"info"} info={"Infotext"}/>
            </div>
          </div>
          <div className="feedbackGridViewerItem" id="feedbackViewer2">
            <div className="feedbackText">
              <FeedbackTextFile type={"success"} info={"Erfolgreiche Korrektur"}/>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="feedbackGridViewer">
        </div>
      </>
    )
  }
}

function FeedbackViewer(props) {
  return (
    <>
      {feedbackDecision(props.feedbackTypes)}
    </>
  )
}

export default FeedbackViewer;