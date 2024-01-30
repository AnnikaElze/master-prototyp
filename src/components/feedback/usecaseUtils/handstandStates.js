export function checkHandstandState (feedbackTexts, exerciseState) {
  // State 1: Starting Position
  if (exerciseState === 0){
    if (feedbackTexts.state1sideArmInfo === "success" && feedbackTexts.state1sideShoulderInfo === "success"
      && feedbackTexts.state1backArmInfo === "success" && feedbackTexts.state1backShoulderInfo === "success") {
      return exerciseState + 1;
    } else {return exerciseState;}
  }

  // State 2: Dynamic movement
  else if (exerciseState === 1) {
    if (feedbackTexts.state2 === "success") {
      return exerciseState + 1;
    } else {return exerciseState}
  }
}