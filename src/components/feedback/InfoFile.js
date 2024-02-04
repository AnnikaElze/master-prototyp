import {Typography} from "@mui/material";

function InfoFile (props) {
  return(
    <>
      <FeedbackText info={props.info}/>
    </>
  )
}

function newlineText(text) {
  return text.split('\n').map(str => <p>{str}</p>);
}

function FeedbackText (props) {

  return(
    <>
      <div className="infoText textBox">
        <Typography key={props.info} variant={'body2'} className="textBoxText">{newlineText(props.info)}</Typography>
      </div>
    </>
  )
}

export default InfoFile;