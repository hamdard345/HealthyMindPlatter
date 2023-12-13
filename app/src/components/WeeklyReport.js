import { Button, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import Chart from "./Chart";
import PhysicalHelp from "./Dialogs/PhysicalHelp";
import ConnectingHelp from "./Dialogs/ConnectingHelp";
import DowntimeHelp from "./Dialogs/DowntimeHelp";
import FocusHelp from "./Dialogs/FocusHelp";
import PlayHelp from "./Dialogs/PlayHelp";
import SleepHelp from "./Dialogs/SleepHelp";
import TimeinHelp from "./Dialogs/TimeinHelp";

/**
 * @param {list} props  an array of all the activities for the selected week
 * @author Noorullah Niamatullah 
 */
export const WeeklyReport = (props) => {
  const [isShown, setIsShown] = useState(false);
  const [isButtonShown, setIsButtonShown] = useState(true);

  //varibales to track if the user spent suggested time on each activity
  let sleepStatus = false;
  let focusStatus = false;
  let playStatus = false;
  let timeinStatus = false;
  let downTimeStatus = false;
  let connectingStatus = false;
  let physicalStatus = false;
  //variable for exception handling
  let weekreport = [{ name: "" }];

  //if the list has any activity it will update the week report
  if (props.list.length === 0) {
    weekreport = [{ name: "" }];
  } else {
    weekreport = props.list;
  }

  let my = [];
  //using the spread operator to combine the elemnts of the two arrays my and week report for excption handling
  const updateWeekReport = [...my, ...weekreport];
  //activity related data which has information such weekly which suggested time for each activity and weekly spent the time user spent on each activiity
  let activityCategoryObj = [
    {
      name: "sleep",
      WeeklyTimeSpent: 0,
      WeeklyGoal: 2940,
      less: "you have not allocated enough sleep time which can lead to fatigue, poor concentration, increased stress, anxiety, and irritability",
      more: " you have allocated enough sleep time this week  which can help  in refreshing your mind and body, consolidating your memory and keeping your immune systems healthy and reduces risk of developing certain chronic health conditions",
    },
    {
      name: "focus",
      WeeklyTimeSpent: 0,
      WeeklyGoal: 420,
      less: " you have not allocated enough time to focus which can lead to decreased productivity, difficulty forming meaningful connections, and poorer mental health",
      more: "you have allocated enough time to focus which can help to reduce stress and anxiety levels",
    },
    {
      name: "play",
      WeeklyTimeSpent: 0,
      WeeklyGoal: 210,
      less: "you have not allocated enough time to play which can lead to feelings of boredom, mental fatigue, and difficulty concentrating on tasks",
      more: "you have allocated enough time to play which can help to stimulate the mind and increase problem-solving abilities, creative thinking, and overall mental well-being. Play Time also helps reduce stress and increase happiness and satisfaction",
    },
    {
      name: "timein",
      WeeklyTimeSpent: 0,
      WeeklyGoal: 70,
      less: "you have Not allocated enough time to timein which can lead to feelings of burnout and overwhelm, which can have a detrimental effect on both physical and mental health",
      more: "you have allocated enough time to Timein.it can help to develop a healthy mental status since it helps the brain to recharge. it also boost creativity and productivity",
    },
    {
      name: "downtime",
      WeeklyTimeSpent: 0,
      WeeklyGoal: 140,
      less: "you have not allocated enough time to downtime which can lead to stress and can result in burnout",
      more: "you have allocated enough time to dwontime which can help to develop a healthy mental status since it helps the brain to recharge, it can also boost creativity and productivity",
    },
    {
      name: "connecting",
      WeeklyTimeSpent: 0,
      WeeklyGoal: 210,
      less: " you should  allocate enough time  each day for connecting time activities like talking to someone, having a meaningful conversation, or going for a walk",
      more: "you have allocated enough time to coneccting time which can helps in boosting creativity and productivity",
    },
    {
      name: "physical",
      WeeklyTimeSpent: 0,
      WeeklyGoal: 210,
      less: "you have  not allocated enough time to phyical activities to  improve physical and mental well-being,increased energey level,improved concentration and enhance stress relief",
      more: "you have allocated enough time to phyiscal activities which can help to improve physical and mental well-being,increased energey level,improved concentration and enhance stress relief",
    },
  ];
  // foreach loop updates the time spent on each activity category
  updateWeekReport.forEach((Element, index, array) => {
    if (Element.activityCategory === "sleep") {
      activityCategoryObj[0].WeeklyTimeSpent += Number(Element.duration);
    }
    if (Element.activityCategory === "focus") {
      activityCategoryObj[1].WeeklyTimeSpent += Number(Element.duration);
    }
    if (Element.activityCategory === "play") {
      activityCategoryObj[2].WeeklyTimeSpent += Number(Element.duration);
    }
    if (Element.activityCategory === "timein") {
      activityCategoryObj[3].WeeklyTimeSpent += Number(Element.duration);
    }
    if (Element.activityCategory === "downtime") {
      activityCategoryObj[4].WeeklyTimeSpent += Number(Element.duration);
    }
    if (Element.activityCategory === "connecting") {
      activityCategoryObj[5].WeeklyTimeSpent += Number(Element.duration);
    }
    if (Element.activityCategory === "physical") {
      activityCategoryObj[6].WeeklyTimeSpent += Number(Element.duration);
    }
  });
  // checking if the user spent enough time on each category of activity which will later decide if the user need to see the help section on each activity or not also to what kind of insight to show for each category
  if (
    activityCategoryObj[0].WeeklyTimeSpent - activityCategoryObj[0].WeeklyGoal >
    0
  ) 
  {
    sleepStatus = true;
  }
  if (
    activityCategoryObj[1].WeeklyTimeSpent - activityCategoryObj[1].WeeklyGoal >
    0
  ) {
    focusStatus = true;
  }
  if (
    activityCategoryObj[2].WeeklyTimeSpent - activityCategoryObj[2].WeeklyGoal >
    0
  ) {
    playStatus = true;
  }
  if (
    activityCategoryObj[3].WeeklyTimeSpent - activityCategoryObj[3].WeeklyGoal >
    0
  ) {
    timeinStatus = true;
  }
  if (
    activityCategoryObj[4].WeeklyTimeSpent - activityCategoryObj[4].WeeklyGoal >
    0
  ) {
    downTimeStatus = true;
  }
  if (
    activityCategoryObj[5].WeeklyTimeSpent - activityCategoryObj[5].WeeklyGoal >
    0
  ) {
    connectingStatus = true;
  }
  if (
    activityCategoryObj[6].WeeklyTimeSpent - activityCategoryObj[6].WeeklyGoal >
    0
  ) {
    physicalStatus = true;
  }
  
  return (
    <div>
      {" "}
      <Card>
        <CardContent>
          <Chart cat={activityCategoryObj} />
          {isButtonShown && (
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: 1, marginBottom: 1 }}
              onClick={() => {
                setIsButtonShown(false);
                setIsShown(true);
              }}
            >
              click here to view insight
            </Button>
          )}
          {isShown && (
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>insight</TableCell>
                    <TableCell>Help</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {sleepStatus
                        ? activityCategoryObj[0].more
                        : activityCategoryObj[0].less}
                    </TableCell>
                    <TableCell>
                      {!sleepStatus && <SleepHelp />}{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {" "}
                      {focusStatus
                        ? activityCategoryObj[1].more
                        : activityCategoryObj[1].less}
                    </TableCell>
                    <TableCell>
                      {!focusStatus && <FocusHelp />}{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {playStatus
                        ? activityCategoryObj[2].more
                        : activityCategoryObj[2].less}
                    </TableCell>
                    <TableCell>
                      {!playStatus && <PlayHelp />}{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {timeinStatus
                        ? activityCategoryObj[3].more
                        : activityCategoryObj[3].less}
                    </TableCell>
                    <TableCell>
                      {!timeinStatus && <TimeinHelp />}{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {downTimeStatus
                        ? activityCategoryObj[4].more
                        : activityCategoryObj[4].less}
                    </TableCell>
                    <TableCell>
                      {!downTimeStatus && <DowntimeHelp />}{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {connectingStatus
                        ? activityCategoryObj[5].more
                        : activityCategoryObj[5].less}
                    </TableCell>
                    <TableCell>
                      {!connectingStatus && <ConnectingHelp />}{" "}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {physicalStatus
                        ? activityCategoryObj[6].more
                        : activityCategoryObj[6].less}
                    </TableCell>
                    <TableCell>
                      {!physicalStatus && <PhysicalHelp />}{" "}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: 1, marginBottom: 1 }}
                onClick={() => {
                  setIsButtonShown(true);
                  setIsShown(false);
                }}
              >
                close insight view
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
