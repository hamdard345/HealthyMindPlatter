import { Button, Grid, Link, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { MonthlyActivity } from "./MonthlyActivity";
/**
 * @author Noorullah Niamatullah
 * @param {authenticated} props is the state tracks user authentication
 * @param{handleAuthenticated} props function which set the authentication state if the user is logged in
 * @returns calandar component which hold list of  monthly  activities along with other features such as search ,filter,edit and delet
 */
const Calander = (props) => {
  //array for the name of the months
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //hook for the serach term
  const [searchterm, setSearchTerm] = useState("");

  //hook for select
  const [selectValue, setSelectValue] = useState("");
  //date object
  const date = new Date();
  //react hook for current month and year
  const [selectedDate, setSelectedDate] = useState({
    year: date.getFullYear(),
    month: date.getMonth(),
  });
  // hook that hold the list of activities reutrned from the database
  const [list, setList] = useState([]);
  //a state that set the list to an empty object for exception handling 
  const [empty, setEmpty] = useState([
    {
      date: "",
      activityCategory: "",
      activityName: "",
      time: "",
      activityNotes: "",
    },
  ]);
  //to get the month name
  let monthN = monthName[selectedDate.month];

  
  /**
   * this function clear any serach or filters first ,than checks if the shown month is the first month of year it will change the year as well
   */
  const changePrevious = () => {
    setSearchTerm("");
    setSelectValue("");
    if (selectedDate.month >= 1) {
      setSelectedDate({ ...selectedDate, month: selectedDate.month - 1 });
    } else {
      setSelectedDate({
        ...selectedDate,
        month: (selectedDate.month = 11),
        year: selectedDate.year - 1,
      });
    }
  };
  //change the name of the month to the next month
  const changeNext = () => {
    setSearchTerm("");
    setSelectValue("");
    if (selectedDate.month >= 0 && selectedDate.month <= 10) {
      setSelectedDate({ ...selectedDate, month: selectedDate.month + 1 });
    } else {
      setSelectedDate({
        ...selectedDate,
        month: (selectedDate.month = 0),
        year: selectedDate.year + 1,
      });
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.handleAuthenticated(true);
      getActivites();
    }
  }, [selectedDate, list]);
  /**
   * making a request to the endpoint getdays with formdata such as start day and end day of the selected month 
   * to match with the endpoint's  required date format of YYYY-MM-DD a leading zero is added before the month number if its the 9th or lower month
   * a beareer token is also sent in the authorsiztion header for authentcaiton 
   * if the data is reutned the state of list is updated which later pass down to the monthlyactivity component 
   */
  const getActivites = () => {
    const formData = new FormData();


    if (selectedDate.month >= 9) {
      formData.append(
        "start",
        selectedDate.year + "-" + (selectedDate.month + 1) + "-" + "01"
      );
      formData.append(
        "end",
        selectedDate.year + "-" + (selectedDate.month + 1) + "-" + "31"
      );
    }
    if (selectedDate.month < 9) {
      formData.append(
        "start",
        selectedDate.year + "-" + "0" + (selectedDate.month + 1) + "-" + "01"
      );
      formData.append(
        "end",
        selectedDate.year + "-" + "0" + (selectedDate.month + 1) + "-" + "31"
      );
    }
    const token = localStorage.getItem("token");
    fetch("http://unn-w18002720.newnumyspace.co.uk/hmp/api/getdays/", {
      method: "POST",
      headers: new Headers({ Authorization: "Bearer " + token }),
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.data.length > 0) {
          setList(json.data);
        } else setList(empty);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const sxGrid = {
    padding: 4,
  };
  return (
    <div>
      {props.authenticated && (
        <Grid sx={sxGrid}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ margin: 1 }}
            onClick={changePrevious}
          >
            previous Month
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ margin:1 }}
            onClick={changeNext}
          >
            Next Month
          </Button>
          <h1>
            {monthN} {selectedDate.year} Activity List
          </h1>
          {list === empty ? (
            <Typography>No activity found for the selected Month</Typography>
          ) : (
            <MonthlyActivity
              list={list}
              searchterm={searchterm}
              setSearchTerm={setSearchTerm}
              selectValue={selectValue}
              setSelectValue={setSelectValue}
            />
          )}
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

export default Calander;
