import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteActivity from "./DeleteActivity";
import PaperDialog from "./PaperDialog";
import Search from "./Search";
/**
 * @author Noorullah Niamatullah w18002720
 * @param {searchterm,setSearchTerm}  prop for serach term and its setter fucntion
 * @param {list} List of the activities returend from the database
 * @param {selectValue,setSelectValue}  prop for select value and its setter function
 * @returns a table which holds a list of all activities along with other functionalities such a serch and filter
 */
const MonthlyActivity = (props) => {
  //hook for pages
  const [page, setPage] = useState(0);
  //hook for rows
  const [rows, setRows] = useState(5);
  let activity = props.list;

  /**
   *
   * @param {time}  activity start time
   * the activity time is stored in the databse h,m format to make it to a standard time format
   * this fucntion takes the input time and replaces the middle comma with periods than add leading zero if necessary
   * @returns hh:mm string in the format
   */
  const formatTime = (time) => {
    const [hours, minutes] = time.toString().replace(",", ".").split(".");
    const formattedHours = hours.padStart(2, "0");
    const formattedMinutes = (minutes || "0").padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };
  /**
   *
   * @param {value} list of activities
   *  @ returns a TableRow component displaying various properties of the value object.
   *  The TableRow contains several TableCell components and two custom components: PaperDialog for editing an activity and DeleteActivity.
   */
  const createRow = (value) => {
    return (
      <TableRow key={value.activityID}>
        <TableCell>{value.date}</TableCell>
        <TableCell>{value.activityCategory}</TableCell>
        <TableCell>{value.activityName}</TableCell>
        <TableCell>{formatTime(value.time)}</TableCell>
        <TableCell>
          {~~(value.duration / 60)} Hours {value.duration % 60} Minutes
        </TableCell>
        <TableCell>{value.activityNotes}</TableCell>
        <TableCell>
          {
            <PaperDialog
              activityID={value.activityID}
              activityCategory={value.activityCategory}
              activityName={value.activityName}
              activityNotes={value.activityNotes}
              date={value.date}
            />
          }
        </TableCell>
        <TableCell>
          {<DeleteActivity activityID={value.activityID} />}
        </TableCell>
      </TableRow>
    );
  };
  const searchActivity = (value) => {
    const activityData =
      value.date +
      value.activityCategory.toLowerCase() +
      value.activityName.toLowerCase() +
      value.time +
      value.activityNotes.toLowerCase();
    return activityData.includes(props.searchTerm.toLowerCase());
  };
  const handleSearch = (term) => {
    props.setSearchTerm(term);
  };
  //filter
  const onChangeSelect = (event) => {
    props.setSearchTerm(event.target.value);
    props.setSelectValue(event.target.value);
  };
  const handleAdd = () => {
    window.location.hash = "#/track";
  };
  return (
    <>
      <Box container ={true.toString()} display="flex" gap="20px" sx={{ paddingBottom: 2 }}>
        <Search searchterm={props.searchterm} handler={handleSearch} />
        <InputLabel id="tagSelectLabel" sx={{ paddingTop: 0.7 }}>
          Filter by Activity Category
        </InputLabel>
        <Select
          value={props.selectValue}
          onChange={onChangeSelect}
          size="small"
        >
          <MenuItem value={"sleep"}>Sleep Time</MenuItem>
          <MenuItem value={"focus"}>Focus Time</MenuItem>
          <MenuItem value={"play"}>Play Time</MenuItem>
          <MenuItem value={"timein"}>Time-In</MenuItem>
          <MenuItem value={"downtime"}>DownTime</MenuItem>
          <MenuItem value={"connecting"}>Connecting Time</MenuItem>
          <MenuItem value={"physical"}>Physical Time</MenuItem>
          <MenuItem value={"0"}>All</MenuItem>
        </Select>
        <Button             
            variant="contained"
            color="secondary"
            sx={{ margin:1 }}
            onClick={handleAdd}
            >
              Add An activity
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category </TableCell>
              <TableCell>Activity Name</TableCell>
              <TableCell>Activity Time</TableCell>
              <TableCell>Duration </TableCell>
              <TableCell>Activity Details</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activity
              .filter(searchActivity)
              .slice(page * rows, page * rows + rows)
              .map((value) => createRow(value))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ "div > p": { marginBottom: "0px !important" } }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={activity.length}
        rowsPerPage={rows}
        page={page}
        onPageChange={(event, page) => setPage(page)}
        onRowsPerPageChange={(event) => {
          setRows(parseInt(event.target.value, 10));
          setPage(0);
        }}
      ></TablePagination>
    </>
  );
};
export default MonthlyActivity;
