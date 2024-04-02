import HomeIcon from '@mui/icons-material/Home';
import {IconButton, Typography} from "@mui/material";
import FeedbackController from "./navbar/FeedbackController";

/** Component overview
 * The Navbar component acts as a control panel, allowing users to navigate through the application,
 * manage feedback types, and control camera settings all from one centralized location at the
 * top of the interface.
 *
 * Used components
 * - FeedbackController
 */

function Navbar (props) {
  return(
    <>
      <div className="header">
        <div className="headerGrid">
          <div className="headerGridItem headerTitle">
            {/* Home button */}
            <RootButton usecase={"Home"} handleRoot={props.handleRoot}/>
            {/* Header title */}
            <Typography variant={"h1"} className="titleText">{props.usecase}</Typography>
          </div>
          <FeedbackController
            feedbackTypes={props.feedbackTypes}
            handleFeedbackType={props.handleFeedbackType}
            handleCamera1={props.handleCamera1}
            camera1={props.camera1}
            handleCamera2={props.handleCamera2}
            camera2={props.camera2}
          />
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