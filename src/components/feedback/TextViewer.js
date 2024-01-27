import TextFile from "./TextFile";
import {Lunge, Handstand} from "./videoViewer/utils/textMessages";
import {checkLungePosition} from "./stateUtils/lungeStates";
import InfoFile from "./InfoFile";

function TextViewer(props) {
  if (props.usecase === "Quadrizeps Dehnung") {
    if (props.exerciseState !== true) {
      const checkFeedbackTexts = { ...props.feedbackTexts, ...props.controlfeedbackTexts };
      props.handleExerciseState(checkLungePosition(checkFeedbackTexts));

      return (
        <>
          {Object.keys(props.feedbackTexts).map(key => (
            <div className="feedbackText">
              <TextFile type={props.feedbackTexts[key]} info={Lunge[key][props.feedbackTexts[key]]}/>
            </div>
          ))}
        </>
      )
    } else if (props.textViewer === 1) {
      return (
        <>
          <div className="feedbackText">
            <TextFile type={"info"} info={Lunge.correctInfo}/>
          </div>
          <div className="feedbackText">
            <InfoFile type={"info"} info={Lunge.stretchingInfo}/>
          </div>
        </>
      )
    }

  } else {

  }

}

export default TextViewer;