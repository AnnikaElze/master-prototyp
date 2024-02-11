export function checkLungePosition (feedbackTexts, exerciseState) {
  if (Object.values(feedbackTexts).length === 6 && !Object.values(feedbackTexts).includes("warning")) {
    return exerciseState + 1;
  } else {
    return exerciseState;
  }
}