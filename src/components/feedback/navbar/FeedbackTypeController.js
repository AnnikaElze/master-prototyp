import ToggleButton from "@mui/material/ToggleButton";
import OverlayIcon from "@mui/icons-material/Layers";
import TextIcon from "@mui/icons-material/Message";
import SignalIcon from "@mui/icons-material/Notifications";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import theme from "../../Theme";

/** Component overview
 * The FeedbackTypeController provides buttons that trigger the handleFeedbackTypes function
 * in the Feedback component.
 */

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
      sx={{
        borderColor: theme.palette.primary.main,
        '& .MuiToggleButton-root': {
          borderColor: theme.palette.primary.main,
          '&.Mui-selected': {
            borderColor: theme.palette.primary.main,
          },
        },
        '.MuiToggleButton-root': {
          backgroundColor: theme.palette.primary.dark,
          '&:hover': {
            backgroundColor: theme.palette.background,
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.background,
            },
          },
        },
      }}
    >
      <ToggleButton value="overlay" color="primary">
        <OverlayIcon className="controlIcon"/>
      </ToggleButton>
      <ToggleButton value="text" color="primary">
        <TextIcon className="controlIcon"/>
      </ToggleButton>
      <ToggleButton value="audio" color="primary">
        <SignalIcon className="controlIcon"/>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default FeedbackTypeController;