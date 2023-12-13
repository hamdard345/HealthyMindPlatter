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
 * @returns a dialog using MUI of suggestion realted  Downtime activities 
 */
export default function DowntimeHelp() {
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
        How can I Maximize my Downtime?
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>How can I Maximize my Downtime?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography gutterBottom>
              Downtime is an essential activity for a healthy mind and refers to
              time when one is not working or active and can relax without any
              specific goal.
            </Typography>
            <Typography gutterBottom>
              {" "}
              Incorporating downtime into your daily routine can help you
              recharge and refocus, allowing you to approach your tasks with
              greater engagement and attention.
            </Typography>
            <Typography>
              There are several ways to maximize your downtime. Some simple ways
              to do so include{" "}
            </Typography>
            <li>Reading</li>
            <li>listening to music or podcasts</li>
            <li>watching something interesting</li>
            <li>thinking and reflecting</li>
            <li>observing your surroundings</li>
            <Typography>
              You can also incorporate meditation into your daily ritual or try
              something as simple as cloud watching. It’s all about finding the
              right way to use your time wisely
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
