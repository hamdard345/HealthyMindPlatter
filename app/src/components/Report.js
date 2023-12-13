import { Button, Grid, Link, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { WeeklyReport } from "./WeeklyReport";
/**
 * * @author Noorullah Niamatullah w18002720
 * @param {authenticated} state tracking if user is logged in or not
 * @returns the report component which has the bar chart and insight view 
 */
const Report = (props) => {
  //hook for the list of activities returend from the database
  const [list, setList] = useState([]);
  //date object used for selected week
  const [newToday, setNewToday] = useState(new Date());
  const [empty, setEmpty] = useState([{ name: "" }]);
  // function calling the get weekly report function if the selected date is changed
  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.handleAuthenticated(true);
      getWeeklyReport();
    }
  }, [newToday]);
  
  function getFirstDayOfWeek(d) {
    // clone date object, so we dont mutate it
    const date = new Date(d);
    const day = date.getDay(); // get day of the week

    // day of month - day of week (-6 if sunday), otherwise +1
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  let firstDay = getFirstDayOfWeek(newToday);

  let lastDay = new Date(firstDay);
  lastDay.setDate(lastDay.getDate() + 6);

  const changePreviousWeek = () => {
    firstDay.setDate(firstDay.getDate() - 7);
    setNewToday(firstDay);
  };
  const changeNextWeek = () => {
    firstDay.setDate(firstDay.getDate() + 7);
    setNewToday(firstDay);
  };
  // fucntion to make a fetch request to weeklyreport with form data such as firstday of the week and last day 
  const getWeeklyReport = () => {
    const formData = new FormData();

    formData.append("startingweek", firstDay.toISOString().slice(0, 10));
    formData.append("endingweek", lastDay.toISOString().slice(0, 10));

    const token = localStorage.getItem("token");
    fetch("http://unn-w18002720.newnumyspace.co.uk/hmp/api/weeklyreport/", {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer " + token }),
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.data.length > 0) {
          setList(json.data);
        } else {
          setList(empty);
        }
        console.log("json", json.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const sxGrid = {
    padding: 4,
    alignItems:"center",
    justify:"center"

  };
  return (
    <div>
      {props.authenticated && (
        <Grid  sx={sxGrid} >
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: 1, marginBottom: 1, marginRight:3 }}
            onClick={changePreviousWeek}
          >
            previous Week
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: 1, marginBottom: 1 }}
            onClick={changeNextWeek}
          >
            Next Week
          </Button>
          <h2>
            {" "}
            Report for the week {firstDay.toISOString().slice(0, 10)} to{" "}
            {lastDay.toISOString().slice(0, 10)}
          </h2>
          {list === empty ?(<Typography>No activity found for the selected Selected Week , To Generate report please add activity for this week</Typography>) :(
          <WeeklyReport list={list} />)}
        </Grid>
      )}
      {!props.authenticated && (
        <Grid>
          <Link href="#/signin">
            <h2>Please Sign in to use this functionality</h2>
          </Link>
        </Grid>
      )}
    </div>
  );
};

export default Report;
