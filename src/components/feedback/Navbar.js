import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import HomeIcon from '@mui/icons-material/Home';
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {IconButton, Typography} from "@mui/material";
import FeedbackController from "./navbar/FeedbackController";

function Navbar (props) {
  return(
    <>
      <div className="header">
        <div className="headerGrid">
          <div className="headerGridItem headerTitle">
            <RootButton usecase={"Home"} handleRoot={props.handleRoot}/>
            <Typography variant={"h1"} className="titleText">{props.usecase}</Typography>
          </div>
          <FeedbackController usecase={props.usecase} feedbackTypes={props.feedbackTypes}
                                handleFeedbackType={props.handleFeedbackType}
                                handleCamera1={props.handleCamera1} camera1={props.camera1}
                                handleCamera2={props.handleCamera2} camera2={props.camera2}/>
        </div>
      </div>
    </>
  )
}

function RootButton(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (continueTraining) => {
    setOpen(false);
    if (!continueTraining) {
      props.handleRoot(props.usecase);
    }
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} ><HomeIcon className="controlIcon"/></IconButton>
      <Dialog open={open} onClose={handleClose} disableBackdropClick={true}
              PaperProps={{
                style: {
                  color: '#E6E6E6',
                  backgroundColor: '#262626',
                },
              }}
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant={'body1'}>{"Möchtest du das Training beenden?"}</Typography>
        </DialogTitle>
        <DialogActions>
          <Button onClick={(e) => handleClose(false)}
                  color="primary"><Typography variant={'button'}>Ja</Typography></Button>
          <Button onClick={(e) => handleClose(true)} autoFocus color="primary">
            <Typography variant={'button'}>Nein</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default Navbar;