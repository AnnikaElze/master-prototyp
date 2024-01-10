import ToggleButton from "@mui/material/ToggleButton";
import OverlayIcon from "@mui/icons-material/Layers";
import TextIcon from "@mui/icons-material/Message";
import AudioIcon from "@mui/icons-material/VolumeUp";
import SignalIcon from "@mui/icons-material/Notifications";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function FeedbackTypeController(props) {

  return(
    <ControllerToggleUnit feedbackTypes={props.feedbackTypes} handleFeedbackType={props.handleFeedbackType}/>
  )
}

function ControllerToggleUnit (props) {

  return (
    <ToggleButtonGroup
      value={props.feedbackTypes}
      onChange={props.handleFeedbackType}
    >
      <ToggleButton value="overlay" color="primary">
        <OverlayIcon />
      </ToggleButton>
      <ToggleButton value="text" color="primary">
        <TextIcon />
      </ToggleButton>
      <ToggleButton value="audio" color="primary">
        <AudioIcon />
      </ToggleButton>
      <ToggleButton value="signal" color="primary">
        <SignalIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default FeedbackTypeController;