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
 * @returns a dialog using MUI of suggestion realted  Physical activities 
 */
export default function PhysicalHelp() {
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
        How can I improve my Physical time?
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>How can I improve my physical time?</DialogTitle>
        <DialogContent>
          <DialogContentText>
           <Typography gutterBottom>Physical Time is an essential component of the Healthy Mind Platter. It involves engaging in physical activity that gets our bodies moving and our hearts pumping. If possible, this should be done aerobically to maximize the benefits for our brains. Regular physical activity can help strengthen the brain in many ways and improve overall mental and physical health.</Typography> 
           <Typography gutterBottom>Some activities that you can do during physical time includes:</Typography> 
           <li>Going for a walk or a run.</li>
           <li>Playing a sport.</li>
           <li>Lifting weights or doing bodyweight exercises.</li>
           <li>Doing yoga or pilates.</li>
           <li>Swimming or cycling.</li>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
