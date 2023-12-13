import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, Typography } from "@mui/material";

/**
 * @author Noorullah Niamatullah w18002720
 * @returns a dialog using MUI of suggestion realted  Connecting activities 
 */
export default function ConnectingHelp() {
  //hook for opening of the Dialog 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link
        variant="outlined"
        onClick={handleClickOpen}
        style={{ cursor: "pointer" }}
      >
        How can I improve my connecting time?
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>How can I improve my connecting time?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography gutterBottom>
              {" "}
              This is when we connect with other people, ideally in person, and
              when we take time to appreciate our connection to the natural
              world around us. This helps activate and reinforce the brain’s
              relational circuitry.
            </Typography>
            <Typography gutterBottom>
              There are many ways to get more connected and improve your
              Connecting Time. Some suggestions include
            </Typography>
            <li>Reaching out to friends and family to spend time together.</li>
            <li>Participating in community events or activities.</li>
            <li>Joining a club or group that shares your interests.</li>
            <li>Volunteering for a cause you care about.</li>
            <li>
              Taking a class or course to learn something new and meet new
              people
            </li>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
