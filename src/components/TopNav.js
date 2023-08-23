import { Card, CardContent, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

function TopNav({ temp, humid, light }) {
  const classes = styles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Card className={classes.item}>
          <CardContent>
            <Typography className={classes.text}>Temperature</Typography>
            <Typography className={classes.text}>{temp}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card className={classes.item}>
          <CardContent>
            <Typography className={classes.text}>Humidity</Typography>
            <Typography className={classes.text}>
              {humid}%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card className={classes.item}>
          <CardContent>
            <Typography className={classes.text}>Light</Typography>
            <Typography className={classes.text}>{light}</Typography>
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
}));

export default TopNav;
