export function checkHandstandState (feedbackTexts, exerciseState) {
  // State 1: Starting Position
  if (exerciseState === 0){
    if (Object.values(feedbackTexts).length === 4 && !Object.values(feedbackTexts).includes("warning")) {
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