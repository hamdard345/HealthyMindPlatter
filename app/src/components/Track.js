import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Grid, MenuItem, Link, Autocomplete } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import backgroundImage from "./img/dana-devolk-x2cNcfz_xXU-unsplash.jpg";
import calculateDuration from "./utills/CalculateDuration";
import handleSelect from "./utills/handleSelect";
import API_BASE_URL from "../config";

/**
 * @author Noorullah Niamatullah
 * select a date using matierial ui date picker and time using TimePicker
 * @returns track component allows user to add activities
 */
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
const Track = props => {
  const [date, setDate] = useState(new Date().toJSON().substring(0, 10));
  const [activity, setActivity] = useState("sleep");
  const [activityName, setActivityName] = useState("");
  const [details, setDetails] = useState("");
  const [startTime, setStart] = useState("");
  const [endTime, setEnd] = React.useState("");
  const [suggestedActivityNames, setSuggestedActivityNames] = useState([
    "Nap",
    "Rest",
    "Doze",
  ]);

  const duration = calculateDuration(startTime, endTime);
  const handleStart = start => {
    let startingTime;
    if (start) {
      startingTime = `${start["$H"]}:${start["$m"]}`;
    }
    return startingTime;
  };
  let starting = handleStart(startTime);
  // Bind the handleSelect function with necessary setters
  const boundHandleSelect = handleSelect(
    setActivity,
    setSuggestedActivityNames
  );
  const handleActivityName = (event, value) => {
    setActivityName(value);
  };
  const handleDetails = event => {
    setDetails(event.target.value);
  };
  // define a function to clear the fields
  const clearFields = () => {
    console.log("clearFields called");
    setDate(new Date().toJSON().substring(0, 10));
    setActivity("");
    setActivityName("");
    setDetails("");
    setStart("");
    setEnd("");
  };
  // checks if the use is logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.handleAuthenticated(true);
    }
  }, []);
  const handleSubmit = event => {
    event.preventDefault();
    console.log("s", duration);
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
    console.log("formdata", formData);
    const token = localStorage.getItem("token");
    fetch(`${API_BASE_URL}addactivity/`, {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer " + token }),
      body: formData,
    })
      .then(response => response.json())
      .then(json => {
        if (json.message === "Success") {
          console.log(json);
          clearFields();
          alert("You have added an activity");
          window.location.hash = "#/allactivity";
        } else {
          alert("something went wrong try again");
        }
      })
      .catch(e => {
        console.log(e.message);
      });
  };

  return (
    <>
      {props.authenticated && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid
            container
            sx={{ marginTop: 3, padding: 5 }}
            justifyContent="center"
            alignItems="center"
            style={styles.GridCContainer}
            justify="center"
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <h3>Add Activity</h3>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <DatePicker
                label="Select a date"
                value={date}
                onChange={newValue => {
                  setDate(newValue.toJSON().substring(0, 10));
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    inputProps={{ ...params.inputProps, readOnly: true }}
                    sx={sxItem}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                label="select activity category"
                value={activity}
                onChange={boundHandleSelect}
                select
                sx={{ width: { xl: 450, lg: 400, md: 300, sm: 200, xs: 150 } }}
              >
                <MenuItem value={"sleep"}>Sleep Time</MenuItem>
                <MenuItem value={"focus"}>Focus Time</MenuItem>
                <MenuItem value={"play"}>Play Time</MenuItem>
                <MenuItem value={"timein"}>Time-In</MenuItem>
                <MenuItem value={"downtime"}>DownTime</MenuItem>
                <MenuItem value={"connecting"}>Connecting Time</MenuItem>
                <MenuItem value={"physical"}>Physical Time</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Autocomplete
                freeSolo
                sx={sxItem}
                margin="normal"
                options={suggestedActivityNames}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Activity Name"
                    placeholder="Enter a custom activity name or choose one from the suggestions"
                  />
                )}
                onChange={handleActivityName}
                onBlur={event => setActivityName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TimePicker
                label="Start time"
                value={startTime}
                ampm={false}
                onChange={newStart => {
                  setStart(newStart);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    inputProps={{ ...params.inputProps, readOnly: true }}
                    sx={sxItem}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TimePicker
                label="end time"
                value={endTime}
                ampm={false}
                onChange={newEnd => {
                  setEnd(newEnd);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    inputProps={{ ...params.inputProps, readOnly: true }}
                    sx={sxItem}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
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
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      )}
      {!props.authenticated && (
        <Grid>
          <Link href="#/signin">
            <h2>Please Sign in to use this functionality</h2>
          </Link>
        </Grid>
      )}
    </>
  );
};

export default Track;
