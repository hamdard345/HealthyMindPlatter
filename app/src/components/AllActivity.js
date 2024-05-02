import { Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import MonthlyActivity from "./MonthlyActivity";
import API_BASE_URL from "../config";

/**
 * Calendar component to display activities for a selected month with features such as search, filter, edit, and delete.
 * @param {boolean} authenticated - State tracking user authentication.
 * @param {function} handleAuthenticated - Function to set the authentication state if the user is logged in.
 */
const AllActivity = ({ authenticated, handleAuthenticated }) => {
  // Array of month names for display
  const months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];
  
  // State for storing the search term input by the user
  const [searchTerm, setSearchTerm] = useState("");
  // State for storing the selected value from a dropdown or similar component
  const [selectValue, setSelectValue] = useState("");
  // Creating a date object to get the current date, month, and year
  const currentDate = new Date();
  // State for storing the currently selected date
  const [selectedDate, setSelectedDate] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
  });
  // State for storing the list of activities fetched from the backend
  const [activities, setActivities] = useState([]);
  // State to track if the fetched activity list is empty
  const [isEmpty, setIsEmpty] = useState(true);

  // Gets the full name of the month for the currently selected date
  const monthName = months[selectedDate.month];

  // Effect hook to fetch activities when the component mounts or the selected date changes
  useEffect(() => {
    if (localStorage.getItem("token")) {
      handleAuthenticated(true);
      fetchActivities();
    }
  }, [selectedDate]); // Dependency array includes only selectedDate to limit effect execution

  // Function to change the month. `delta` is either 1 or -1 to move to the next or previous month.
  const changeMonth = (delta) => {
    setSearchTerm("");
    setSelectValue("");
    const newMonth = selectedDate.month + delta;
    const newYear = selectedDate.year + (newMonth > 11 ? 1 : newMonth < 0 ? -1 : 0);
    setSelectedDate({
      month: (newMonth + 12) % 12, // Ensures the month wraps correctly from December to January and vice versa
      year: newYear
    });
  };

  // Function to fetch activities based on the selected date
const fetchActivities = () => {
  const monthIndex = selectedDate.month + 1;
  const paddedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex; // Ensuring two-digit month format
  const formData = new FormData();
  formData.append("start", `${selectedDate.year}-${paddedMonth}-01`); // Start of the month
  formData.append("end", `${selectedDate.year}-${paddedMonth}-31`); // End of the month

  const token = localStorage.getItem("token");
  fetch(`${API_BASE_URL}getdays`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    // Check if data.data exists and has any length; if not, set empty to true
    console.log(data)
    const activities = data.data ?? [];
    setIsEmpty(activities.length === 0);
    setActivities(activities);
  })
  .catch(error => console.error('Fetch activities failed:', error));
};

  // Render part of the component
  return (
    <div>
      {authenticated ? (
        <Grid sx={{ padding: 4 }}>
          <Button variant="contained" color="secondary" sx={{ margin: 1 }} onClick={() => changeMonth(-1)}>Previous Month</Button>
          <Button variant="contained" color="secondary" sx={{ margin: 1 }} onClick={() => changeMonth(1)}>Next Month</Button>
          <Typography variant="h4">{monthName} {selectedDate.year} Activity List</Typography>
          {isEmpty ? (
            <Typography>No activity found for the selected month.</Typography>
          ) : (
            <MonthlyActivity list={activities} searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectValue={selectValue} setSelectValue={setSelectValue} />
          )}
        </Grid>
      ) : (
        <Grid>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Please <a href="#/signin">Sign in</a> to use this functionality.
          </Typography>
        </Grid>
      )}
    </div>
  );
};

export default AllActivity;
