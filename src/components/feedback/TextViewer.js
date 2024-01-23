import TextFile from "./TextFile";

function feedbackDecision (feedbackTypes) {
  if (feedbackTypes.includes('text')) {
    return (
      <>
        <div className="feedbackGridViewer">
          <div className="feedbackGridViewerItem" id="feedbackViewer1">
            <div className="feedbackText">
              <TextFile type={"warning"} info={"Fehlerhinweis"}/>
            </div>
            <div className="feedbackText">
              <TextFile type={"info"} info={"Infotext"}/>
            </div>
          </div>
          <div className="feedbackGridViewerItem" id="feedbackViewer2">
            <div className="feedbackText">
              <TextFile type={"success"} info={"Erfolgreiche Korrektur"}/>
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

function TextViewer(props) {
  return (
    <>
      {feedbackDecision(props.feedbackTypes)}
    </>
  )
}

export default TextViewer;