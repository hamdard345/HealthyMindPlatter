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
 * @returns a dialog using MUI of suggestion realted  Play activities
 */
export default function PlayHelp() {
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
        How can I get more Playtime activities?
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>How to get more Play activities</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography gutterBottom>
              There are several playtime activities that can help the brain:
            </Typography>
            <li>These include playing games like card games or board games</li>
            <li>Working on puzzles</li>
            <li>Playing chess.</li>
            <li>Dancing.</li>
            <li>Engaging in hobbies, reading, and telling stories.</li>
            <Typography>
              These activities can help improve memory, cognition, and
              creativity.
            </Typography>
            <Typography>
              By managing your time better and making a schedule that includes
              time for playtime activities, you can make the most of these
              brain-boosting benefits. Playtime activities can help you overcome
              boredom and mental fatigue.
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
