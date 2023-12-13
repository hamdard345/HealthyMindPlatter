import * as React from "react";
import {
  Button,
  Dialog,
  List,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  ListItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Update from "./Update";
/**
 * @author Noorullah Niamatullah w18002720
 * @ return PaperDialog using MUI Full-screen dialogs component to edit an activity 
 * @props  activityID={value.activityID} activityCategory={value.activityCategory} activityName={value.activityName} activityNotes={value.activityNotes}
   date={value.date}
 *
 */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    activityID: props.activityID,
    activityCategory: props.activityCategory,
    activityName: props.activityName,
    activityNotes: props.activityNotes,
    date: props.date,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Discard Changes
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <Update data={data} setOpen={setOpen} />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
