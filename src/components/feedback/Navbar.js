import HomeIcon from '@mui/icons-material/Home';
import {IconButton, Typography} from "@mui/material";
import FeedbackController from "./navbar/FeedbackController";

/**
 * @parent Feedback
 * @props handleRoot, usecase, feedbackTypes, handleFeedbackType, handleCamera1, camera1, handleCamera2, camera2
 * @children FeedbackController
 * @return RootButton, Title
 */

function Navbar (props) {
  return(
    <>
      <div className="header">
        <div className="headerGrid">
          <div className="headerGridItem headerTitle">
            <RootButton usecase={"Home"} handleRoot={props.handleRoot}/>
            <Typography variant={"h1"} className="titleText">{props.usecase}</Typography>
          </div>
          <FeedbackController feedbackTypes={props.feedbackTypes}
                                handleFeedbackType={props.handleFeedbackType}
                                handleCamera1={props.handleCamera1} camera1={props.camera1}
                                handleCamera2={props.handleCamera2} camera2={props.camera2}/>
        </div>
      </div>
    </>
  )
}

function RootButton(props) {
  return (
    <>
      <IconButton onClick={(e) => props.handleRoot(props.usecase)} ><HomeIcon className="controlIcon"/></IconButton>
    </>
  )
}
export default Navbar;