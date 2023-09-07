import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

function Header({ temp, humid, light }) {
  const classes = styles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Card
          className={`${classes.item} ${
            temp >= 40 ? classes.redBackground : ""
          }`}
        >
          <CardContent>
            <Typography className={classes.text}>Temperature</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Typography className={classes.text}>{temp} </Typography>
              <Typography sx={{ fontSize: 10 }}>o</Typography>
              <Typography>C</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card
          className={`${classes.item} ${
            humid >= 70 ? classes.redBackground : ""
          }`}
        >
          <CardContent>
            <Typography className={classes.text}>Humidity</Typography>
            <Typography className={classes.text}>{humid}%</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card
          className={`${classes.item} ${
            light >= 70 ? classes.redBackground : ""
          }`}
        >
          <CardContent>
            <Typography className={classes.text}>Light</Typography>
            <Typography className={classes.text}>{light} lux</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  item: {
    height: "100%",
  },
  text: {
    textAlign: "center",
  },
  redBackground: {
    backgroundColor: "#f44336!important",
    opacity: 0.5,
    animation: "$blink 1s infinite",
  },
  "@keyframes blink": {
    "0%, 100%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.3,
    },
  },
}));

export default Header;
