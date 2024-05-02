import {Box,Button,Card,CardMedia,Container,Grid,Link,Typography,} from "@mui/material";
import React, { useState, useEffect } from "react";
import ActivitiesExplained from "./ActivitiesExplained";
import NordWood from "./img/NordWood.avif";
/**
 * HomePage Class displaing all the healthy mind platter activity  with realted information , application instructions ,credited Image, my name, ID along with a footer.
 *
 * @author Noorullah Niamatullah w18002720
 */

const Homepage = () => {
  const [isShown, setIsShown] = useState(true);
  const [firstStep, setFirstStep] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsShown(false);
    }
  }, []);

  return (
    <div>
      <Card
        sx={{
          position: "relative",
          borderBottomRightRadius: "20%",
          borderBottomLeftRadius: "20%",
        }}
      >
        <CardMedia component="img" height="250" image={NordWood} />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            bgcolor: "rgba(0, 0, 0, 0.44)",
            color: "white",
            padding: "120px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
            }}
            variant="h3"
          >
            The Healthy Mind Platter
          </Typography>
          <Typography className="subi" variant="body2">
            keep your mind healthy
          </Typography>
        </Box>
      </Card>
      <Container maxWidth="lg" width="100%">
        <Grid container direction="column">
          <Grid item>
            <h3>Click on each Activity To learn more </h3>
            <ActivitiesExplained />
          </Grid>

          <Grid item align="center" justifyContent="center">
            <Typography variant="h4" gutterBottom align="center">
              {" "}
              How to use this application
            </Typography>
            <Button
              onClick={() => setFirstStep(true)}
              variant="contained"
              color="secondary"
            >
              View instructions
            </Button>

            {firstStep && (
              <Box item align="center" justifyContent="center">
                <Typography gutterBottom align="center">
                  {" "}
                  Start by Tracking where you can add daily Activities Click on
                  Add Activity which will take you to the Add Activity Form Fill
                  in all the required Detail and click Submit Button. After
                  adding all your weekly Activities you can view your Report on
                  by Clicking the Report tab on the navigation bar
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      <Grid item align="center" sx={{ mt: 1 }}>
        {isShown && (
          <Link href="#/signup">
            <Button variant="contained" color="secondary">
              Sign up
            </Button>
          </Link>
        )}
      </Grid>
    </div>
  );
};
export default Homepage;
