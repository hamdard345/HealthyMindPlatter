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
 * @returns a dialog using MUI of suggestion realted  Sleep activities
 */
export default function SleepHelp() {
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
        How can I get better sleep?
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>How can I get better sleep?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography gutterBottom>
              Being consistent with your sleep schedule by going to bed and
              getting up at the same time each day, including on the weekends
            </Typography>
            <Typography gutterBottom>
              Controlling your exposure to light by increasing bright light
              exposure during the day and reducing blue light exposure in the
              evening
            </Typography>
            <Typography gutterBottom>
              Don’t consume caffeine late in the day
            </Typography>
            <Typography gutterBottom>
              Reduce irregular or long daytime naps
            </Typography>
            <Typography gutterBottom>
              Take a relaxing bath or shower before bed
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
