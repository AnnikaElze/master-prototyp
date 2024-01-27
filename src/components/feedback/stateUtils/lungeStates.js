export function checkLungePosition (feedbackTexts) {
  if (feedbackTexts.sideBodyInfo === "success") {
    return true;
  }
}

// feedbackTexts1.sideLegInfo === "success" && feedbackTexts1.sideHipInfo === "success" &&
// feedbackTexts1.sideBodyInfo === "success" && feedbackTexts2.backLegInfo === "success" &&
// feedbackTexts2.backHipInfo === "success" && feedbackTexts2.backBodyInfo === "success"