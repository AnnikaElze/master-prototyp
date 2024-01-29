import TextFile from "./TextFile";
import {Lunge, Handstand} from "./usecaseUtils/textMessages";
import {checkLungePosition} from "./usecaseUtils/lungeStates";
import InfoFile from "./InfoFile";
import Countdown from "./Countdown";

/**
 * @parent Feedback
 * @props feedbackTexts, controlFeedbackTexts, usecase, handleExerciseState, exerciseState, textViewer
 * @helpfunctions checkLungePosition | checkHandstandStartingPosition
 * @return TextFiles in the type and order required by the current exerciseState
 */

function TextViewer(props) {
  // Usecase: Stretching
  if (props.usecase === "Quadrizeps Dehnung") {
    // State 1: Pose Correction
    if (props.exerciseState === 0) {
      const checkFeedbackTexts = { ...props.feedbackTexts, ...props.controlFeedbackTexts };
      props.handleExerciseState(checkLungePosition(checkFeedbackTexts, props.exerciseState));

      return (
        <>
          {Object.keys(props.feedbackTexts).map(key => (
            <div className="feedbackText">
              <TextFile type={props.feedbackTexts[key]} info={Lunge[key][props.feedbackTexts[key]]}/>
            </div>
          ))}
        </>
      )
    }
    // State 2: Execution
    else if (props.textViewer === 1 && props.exerciseState === 1) {
      return (
        <>
          <div className="feedbackText">
            <TextFile type={"info"} info={Lunge.correctInfo}/>
          </div>
          <Countdown countdown={30} handleExerciseState={props.handleExerciseState} exerciseState={props.exerciseState}/>
          <div className="feedbackText">
            <InfoFile type={"info"} info={Lunge.stretchingInfo}/>
          </div>
        </>
      )
    }
    // State 3: Finish
    else {
      if (props.textViewer === 1){
        return (
          <>
            <div className="feedbackText exitText">
              <TextFile type={"success"} info={Lunge.exitInfo}/>
            </div>
          </>
        )
      }
    }
  }
  // Usecase: Handstand
  else {
    // State 1: Starting Position
    if (props.exerciseState === 0) {

    }
    // State 2: Dynamic movement

    // State 3: Handstand

    // State 4: Finish
  }

}

export default TextViewer;