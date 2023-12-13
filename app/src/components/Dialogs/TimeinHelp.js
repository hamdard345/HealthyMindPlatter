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
 * @returns a dialog using MUI of suggestion realted  Timein activities
 */
export default function TimeInHelp() {
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
        How can I incorporate “Time-In” activities into my daily routine?
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {" "}
          Here are some suggestions for incorporating “Time-In” activities into
          your daily routine:
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography gutterBottom>
              {" "}
              “Time-In” refers to the time we spend reflecting internally,
              focusing on sensations, images, feelings, and thoughts.{" "}
            </Typography>
            <Typography gutterBottom>
              This can be achieved through practices such as{" "}
            </Typography>
            <li>Mindfulness</li>
            <li>Meditation</li>
            <li>Quiet reflection</li>
            <li>Deep breathing exercises</li>
            <li>Journaling</li>
            <Typography>
              To incorporate “Time-In” activities into your daily routine, you
              can set aside a specific time each day, find a quiet and
              comfortable space, choose an activity that helps you focus inward,
              and start with a few minutes each day. These practices can help
              you become more aware of your internal experiences and improve
              your emotional well-being.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
