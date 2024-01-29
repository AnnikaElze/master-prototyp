import {Typography} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/* props
    type < warning | success | info >
    info < string >
*/

function TextFile (props) {
  return(
    <>
      <FeedbackText type={props.type} info={props.info}/>
    </>
  )
}

function FeedbackText (props) {
  function handleFeedbackTextColor (type) {
    if (type === "warning"){
      return "textBoxWarning textBox"
    } else if (type === "success") {
      return "textBoxSuccess textBox"
    } else return "textBoxInfo textBox"
  }

  function FeedbackIcon (type) {
    if (type === "warning"){
      return(<WarningIcon color={"error"} className="textBoxText"/>)
    } else if (type === "success") {
      return(<CheckCircleIcon color={"secondary"} className="textBoxText"/>)
    } else return(<InfoIcon color={"primary"} className="textBoxText"/>)
  }

  return(
    <>
      <div className={handleFeedbackTextColor(props.type)}>
        {FeedbackIcon(props.type)}
        <Typography variant={'body2'} className="textBoxText">{props.info}</Typography>
      </div>
    </>
    )
}

export default TextFile;