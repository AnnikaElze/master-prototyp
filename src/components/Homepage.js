import Button from "@mui/material/Button";
import {Typography} from "@mui/material";

let homepageStyle = {
  textAlign: 'center',
  paddingTop: '40vh',
}
function Homepage (props) {
  return(
    <>
      <div style={homepageStyle}>
        <RootButton usecase={"Stretching"} handleRoot={props.handleRoot}/>
        <RootButton usecase={"Poledance"} handleRoot={props.handleRoot}/>
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