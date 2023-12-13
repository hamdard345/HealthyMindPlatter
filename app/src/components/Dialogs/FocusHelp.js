import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, Typography } from '@mui/material';
/**
 * @author Noorullah Niamatullah w18002720
 * @returns a dialog using MUI of suggestion realted  Focus activities 
 */
export default function FocusHelp() {
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
      <Link variant="outlined" onClick={handleClickOpen}style={{ cursor: 'pointer' }}>
        How can I stay focused?
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>How to get more Focused</DialogTitle>
        <DialogContent>
          <DialogContentText>
           <Typography gutterBottom>there are several tips for eliminating distractions that can help you stay focused:</Typography> 
           <li>These include moving to a quiet area.</li> 
           <li>Turning off notifications on your phone or turning your phone off altogether.</li> 
            <li>Telling those around you not to distract you for a period of time.</li> 
            <li>Closing out of non-essential programs or apps on your computer.</li>
            <li>Playing calming ambient music or white noise, and decluttering the space where you will be working.</li> 
           <Typography gutterBottom>Additionally,To improve focus on complex projects, you can break them down into smaller parts using the SMART formula. SMART stands for Specific, Measurable, Achievable, Relevant, and Timely. This helps you create achievable goals and improves your ability to concentrate and focus on specific tasks.</Typography> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
