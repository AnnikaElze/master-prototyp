import TextFile from "./TextFile";

const FeedbackTexts = ({ feedbackTexts }) => {
  return (
    <>
      {feedbackTexts.map((feedbackText) =>
        <div className="feedbackText">
          <TextFile type={feedbackText[0]} info={feedbackText[1]}/>
        </div>
      )};
    </>
  )
}

function TextViewer(props) {
  return (
    <FeedbackTexts feedbackTexts={props.feedbackTexts}/>
  )
}

export default TextViewer;