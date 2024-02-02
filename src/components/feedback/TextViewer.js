import TextFile from "./TextFile";
import {Lunge, Handstand} from "./usecaseUtils/textMessages";
import {checkLungePosition} from "./usecaseUtils/lungeStates";
import InfoFile from "./InfoFile";
import Countdown from "./Countdown";
import {checkHandstandState} from "./usecaseUtils/handstandStates";

/**
 * @parent Feedback
 * @props feedbackTexts, controlFeedbackTexts, usecase, handleExerciseState, exerciseState, textViewer
 * @helpfunctions checkLungePosition | checkHandstandStartingPosition
 * @return TextFiles in the type and order required by the current exerciseState
 */

function checkState (feedbackTexts, controlFeedbackTexts, handleExerciseState, exerciseState, usecase) {
  const checkFeedbackTexts = { ...feedbackTexts, ...controlFeedbackTexts };
  if (usecase === "lunge") {
    handleExerciseState(checkLungePosition(checkFeedbackTexts, exerciseState));
  } else {
    handleExerciseState(checkHandstandState(checkFeedbackTexts, exerciseState));
  }

}

function TextViewer(props) {
  // Usecase: Stretching
  if (props.usecase === "Quadrizeps Dehnung") {
    // State 1: Pose Correction
    if (props.exerciseState === 0) {
      checkState(props.feedbackTexts, props.controlFeedbackTexts, props.handleExerciseState, props.exerciseState, "lunge");

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
    // State 1 & 3: Starting Position, Handstand Position
    if (props.exerciseState === 0 || props.exerciseState === 2) {
      checkState(props.feedbackTexts, props.controlFeedbackTexts, props.handleExerciseState, props.exerciseState, "handstand");

      return (
        <>
          {Object.keys(props.feedbackTexts).map(key => (
            <div className="feedbackText">
              <TextFile type={props.feedbackTexts[key]} info={Handstand[key][props.feedbackTexts[key]]}/>
            </div>
          ))}
        </>
      )
    }
    // State 2: Dynamic movement
    else if (props.exerciseState === 1 && props.textViewer === 1) {
      return (
        <>
          <div className="feedbackText">
            <InfoFile type={"info"} info={Handstand.state2.warning}/>
          </div>
        </>
      )
    }
    // State 3: Handstand

  }

}

export default TextViewer;