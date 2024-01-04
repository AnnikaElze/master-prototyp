import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import HomeIcon from '@mui/icons-material/Home';
import {useState} from "react";
import Button from "@mui/material/Button";
import {IconButton, Typography} from "@mui/material";

function FeedbackHeader (props) {
  return(
    <>
      <div className="feedbackGridHeader">
        <div className="feedbackGridHeaderItem feedbackGridHeaderItemTitle">
          <Typography variant={"h1"}>{props.usecase}</Typography>
        </div>
        <div className="feedbackGridHeaderItem feedbackGridHeaderItemButton">
          <RootButton usecase={"Home"} handleRoot={props.handleRoot}/>
        </div>
      </div>
    </>
  )
}

function RootButton (props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (continueTraining) => {
    setOpen(false);
    if (!continueTraining){
      props.handleRoot(props.usecase);
    }
  };

  return (
    <>
      <IconButton color="primary" onClick={handleClickOpen}><HomeIcon/></IconButton>
      <Dialog open={open} onClose={handleClose} disableBackdropClick={true}
              PaperProps={{
                style: {
                  backgroundColor: '#FCFCFC',
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
export default FeedbackHeader;