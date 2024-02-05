import Button from "@mui/material/Button";
import {Typography} from "@mui/material";

/**
 * @parent App
 * @props handleRoot
 * @return RootButton
 */

let homepageStyle = {
  textAlign: 'center',
  paddingTop: '40vh',
}

function Homepage (props) {
  return(
    <>
      <div style={homepageStyle}>
        <RootButton usecase={"Setup"} handleRoot={props.handleRoot}/>
        <RootButton usecase={"Quadrizeps Dehnung"} handleRoot={props.handleRoot}/>
        <RootButton usecase={"Pole Handstand"} handleRoot={props.handleRoot}/>
      </div>
    </>
  )
}

function RootButton (props) {
  return (
    <Button variant="contained" className="homepageButton" onClick={(e) => props.handleRoot(props.usecase)}>
      <Typography variant={'button'}>{props.usecase}</Typography>
      </Button>
  )
}

export default Homepage;