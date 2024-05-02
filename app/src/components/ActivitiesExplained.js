
import React, { useEffect, useState } from "react";
import NightlightIcon from "@mui/icons-material/Nightlight";
import {Box, Grid, IconButton, Paper,Typography } from "@mui/material";
import { activityDdata, activityDataObject } from "./ActivityData";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import GroupsIcon from "@mui/icons-material/Groups";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
/**
 * @author Noorullah Niamatullah
 * @returns A MUI paper component which holds the acitivity related information for the homepage of the application
 */
const ActivitiesExplained = () => {
  //hook for the slide
  const [slide, setSlide] = useState(null);
  //text of the slide from activity Data object 
  const [slideText, setSlideText] = useState(null);
  /**
   * update the slide and slidtext states to show activity related information
   * @param {name} name of the activity selected by the user
   */
  const toggleSlide = (name) => {
    setSlide(name);
    setSlideText(activityDataObject[name]);
  }

  useEffect(() => {
    toggleSlide('sleep');
  }, []);
  

  return (
    <>

      <Grid container spacing={2} >

        <Grid item container
          xs={12} md={3}
          order={{ xs: 2, md: 1 }}
          direction={{ xs: 'row', md: 'column' }}
          justifyContent={{xs: 'space-between', md: 'flex-start'}}
          sx={{
            overflow: 'auto'
          }}
        >
          
          <Grid item>

            <IconButton  color ={slide === 'sleep' ? "secondary" :""} size="large" onClick={() => toggleSlide('sleep')}>
              <NightlightIcon fontSize="large" /> Sleep
            </IconButton>
            
          </Grid>

          <Grid item>

            <IconButton color ={slide === 'focus' ? "secondary" :""} size="large" onClick={() => toggleSlide('focus')}>
              <PsychologyIcon fontSize="large" /> Focus
              </IconButton >
              
          </Grid>
          
          <Grid item>

            <IconButton color ={slide === 'play' ? "secondary" :""} size="large"  onClick={() => toggleSlide('play')}>
              <SportsEsportsIcon fontSize="large" /> Play
            </IconButton>
              
          </Grid>      
            
          <Grid item>

            <IconButton color ={slide === 'timein' ? "secondary" :""}  onClick={() => toggleSlide('timein')}>
              <SelfImprovementIcon fontSize="large" /> Timein
              </IconButton>
              
          </Grid>
            
          <Grid item>

            <IconButton color ={slide === 'downtime' ? "secondary" :""}  onClick={() => toggleSlide('downtime')}>
              <AutoStoriesIcon fontSize="large" /> Down Time
            </IconButton>
              
          </Grid>
            
          <Grid item>

            <IconButton color ={slide === 'coneccting' ? "secondary" :""}  onClick={() => toggleSlide('coneccting')}>
              <GroupsIcon fontSize="large" /> Connecting
            </IconButton>
              
            </Grid>
            
          <Grid item>

            <IconButton  color ={slide === 'physical' ? "secondary" :""}  onClick={() => toggleSlide('physical')}>
              <FitnessCenterIcon  fontSize="large" /> Physical Time
            </IconButton>
              
          </Grid>          
            
        </Grid>

        <Grid item xs={12} md={9} order={{xs: 1, md: 2}}>
          <Paper sx={{ padding: 2, boxSizing: 'border-box', height: "100%" }}>
            <Box mb={2}>
              <Typography variant="body">
                {slideText}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

    </>
  );
};

export default ActivitiesExplained;
