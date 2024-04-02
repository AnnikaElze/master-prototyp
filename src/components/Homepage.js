import Button from "@mui/material/Button";
import {Typography} from "@mui/material";

/** Component overview
 * The Homepage component serves as the entry point or main menu of the application,
 * allowing users to choose from different use cases.
 */

// Define styles
let homepageStyle = {
  textAlign: 'center',
  paddingTop: '40vh',
}

// Homepage component with 3 buttons
function Homepage (props) {
  return(
    <>
      <div style={homepageStyle}>
        <RootButton
          usecase={"Setup"}
          handleRoot={props.handleRoot}
        />
        <RootButton
          usecase={"Quadrizeps Dehnung"}
          handleRoot={props.handleRoot}
        />
        <RootButton
          usecase={"Pole Handstand"}
          handleRoot={props.handleRoot}
        />
      </div>
    </>
  )
}

// Custom button component (RootButton) which triggers the handleRoot function in the App component
function RootButton (props) {
  return (
    <Button variant="contained" className="homepageButton" onClick={(e) => props.handleRoot(props.usecase)}>
      <Typography variant={'button'}>{props.usecase}</Typography>
      </Button>
  )
}

export default Homepage;