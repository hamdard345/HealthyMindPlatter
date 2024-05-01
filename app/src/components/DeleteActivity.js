import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import API_BASE_URL from "../config";

/**
 * @author Noorullah Niamatullah w18002720
 * @param {*activity id} props which is the id of the activity
 * @returns making a fetch to delete the selected actiivty after the user has confirmed
 */
export default function DeleteActivity(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (event) => {
    const formData = new FormData();
    formData.append("activityID", props.activityID);
    const token = localStorage.getItem("token");
    fetch(`${API_BASE_URL}deleteactivity`, {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer " + token }),
      body: formData,
    })
      .then((response) => response.text())
      .then((json) => {
        console.log(json);
        setOpen(false);
        alert("activity has been deleted");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Activity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to Delete the current activity?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
