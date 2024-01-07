import FeedbackTextFile from "./FeedbackTextFile";

function FeedbackViewer (props) {
  return(
    <>
      <div className="feedbackGridViewer">
        <div className="feedbackGridViewerItem" id="feedbackViewer1">
          <div className="feedbackText">
            <FeedbackTextFile severity={"warning"} info={"Fehlerhinweis"}/>
          </div>
          <div className="feedbackText">
            <FeedbackTextFile severity={"info"} info={"Infotext"}/>
          </div>
        </div>
        <div className="feedbackGridViewerItem" id="feedbackViewer2">
          <div className="feedbackText">
            <FeedbackTextFile severity={"success"} info={"Erfolgreiche Korrektur"}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeedbackViewer;