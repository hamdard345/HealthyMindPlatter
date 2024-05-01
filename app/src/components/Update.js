import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Grid, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import backgroundImage from "./img/dana-devolk-x2cNcfz_xXU-unsplash.jpg";
import API_BASE_URL from "../config";

/**
 * update component allows to update deatails of an activity
 * @author Noorullah Niamatullah w18002720
 * prps data holds informatrion sucha activityID ,activityCategory activityName ,activityNotes, date
 * props setopen  function which hold the state which opens and close the dialog
 */
const Update = (props) => {
  const [date, setDate] = useState(props.data.date);
  const [activity, setActivity] = useState(props.data.activityCategory);
  const [activityName, setActivityName] = useState(props.data.activityName);
  const [details, setDetails] = useState(props.data.activityNotes);
  const [startTime, setStart] = useState("");
  const [endTime, setEnd] = React.useState("");

  // array for start time
  let starting = [];
  // array first positin is the hour
  starting[0] = startTime.$H;
  //second positin is the minutes
  starting[1] = startTime.$m;
  let ending = [];
  ending[0] = endTime.$H;
  ending[1] = endTime.$m;

  let duration = 0;
  /**
   * if the activity started before midnight take the differnce till midnight add it to the time after midnight if the activity started after midnight duration is end time minus start
   */
  if (ending[0] < starting[0]) {
    duration =
      24 * 60 - (starting[0] * 60 + starting[1]) + (ending[0] * 60 + ending[1]);
  } else {
    duration = ending[0] * 60 + ending[1] - (starting[0] * 60 + starting[1]);
  }
  const handleSelect = (event) => {
    setActivity(event.target.value);
  };
  const handleActivityName = (event) => {
    setActivityName(event.target.value);
  };

  const handleDetails = (event) => {
    setDetails(event.target.value);
  };
  /**
   * check if the duration and activity category is set, than makes the update fetch to api endpont updateactivity with all the activity related informations 
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!duration) {
      alert("Please fill out all required fields");
      return;
    }
    if (!activity) {
      alert("Please select an activity category");
      return;
    }
    const formData = new FormData();
    formData.append("activityCategory", activity);
    formData.append("activityName", activityName);
    formData.append("date", date);
    formData.append("time", starting);
    formData.append("duration", duration);
    formData.append("activityNotes", details);
    formData.append("activityID", props.data.activityID);

    const token = localStorage.getItem("token");
    fetch(`${API_BASE_URL}updateactivity`, {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer " + token }),
      body: formData,
    })
      .then((response) => response.text())
      .then((json) => {
        console.log(json);
        props.setOpen(false);
        alert("activity has been updated");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const sxItem = {
    width: { xl: 450, lg: 400, md: 300, sm: 200, xs: 150 },
    mb: 1,
  };
  const styles = {
    GridCContainer: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      marginTop: 0,
    },
  };
  return (
    <Grid
      container
      sx={{ marginTop: 3, padding: 5 }}
      justifyContent="center"
      alignItems="center"
      style={styles.GridCContainer}
    >
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <h3>Add Activity</h3>
      </Grid>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <DatePicker
            label="Select a date"
            value={date}
            disablePast={true}
            onChange={(newValue) => {
              setDate(newValue.toJSON().substring(0, 10));
            }}
            renderInput={(params) => <TextField {...params} sx={sxItem} />}
          />
        </Grid>
      </LocalizationProvider>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Select
          value={activity}
          onChange={handleSelect}
          label="Activity"
          sx={{ width: { xl: 450, lg: 400, md: 300, sm: 200, xs: 150 } }}
        >
          <MenuItem value={"sleep"}>Sleep Time</MenuItem>
          <MenuItem value={"focus"}>Focus Time</MenuItem>
          <MenuItem value={"play"}>Play Time</MenuItem>
          <MenuItem value={"timein"}>Time-In</MenuItem>
          <MenuItem value={"downtime"}>DownTime</MenuItem>
          <MenuItem value={"connecting"}>Connecting Time</MenuItem>
          <MenuItem value={"physical"}>Physical Time</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <TextField
          margin="normal"
          required
          type="text"
          label="Activity Name"
          value={activityName}
          onChange={handleActivityName}
          sx={sxItem}
        />
      </Grid>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TimePicker
            label="Start time"
            value={startTime}
            ampm={false}
            onChange={(newStart) => {
              setStart(newStart);
            }}
            renderInput={(params) => <TextField {...params} sx={sxItem} />}
          />
        </Grid>
      </LocalizationProvider>

      <Grid item xs={12} sm={12} md={12} lg={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="end time"
            value={endTime}
            ampm={false}
            onChange={(newEnd) => {
              setEnd(newEnd);
            }}
            renderInput={(params) => <TextField {...params} sx={sxItem} />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <TextField
          required
          type="text"
          label="Details"
          multiline
          value={details}
          onChange={handleDetails}
          maxRows={4}
          sx={sxItem}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} sx={sxItem}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: 1 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default Update;
