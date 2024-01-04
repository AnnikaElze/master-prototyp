import {Alert, Typography} from "@mui/material";

{/* This is a Feedback Text File. It needs a severity and an info.
    Valid severity types: warning, info, success
    Info is the text shown in the Feedback Field.
*/}

function FeedbackTextFile (props) {
  return(
    <>
      <FeedbackText severity={props.severity} info={props.info}/>
    </>
  )
}

function FeedbackText (props) {
  function handleFeedbackTextColor (severity) {
    if (severity === "warning"){
      return "error"
    } else if (severity === "success") {
      return "secondary"
    } else return "primary"
  }

  return(
    <Alert severity={props.severity} color={handleFeedbackTextColor(props.severity)}>
      <Typography variant={'body2'}>{props.info}</Typography>
    </Alert>
    )
}

export default FeedbackTextFile;