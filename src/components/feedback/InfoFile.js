import {Typography} from "@mui/material";

{/* props
    type < warning | success | info >
    info < string >
*/}

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
        <Typography variant={'body2'} className="textBoxText">{newlineText(props.info)}</Typography>
      </div>
    </>
  )
}

export default InfoFile;