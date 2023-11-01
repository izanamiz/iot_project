import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { SENSOR_DATA_KEY } from "../../constants";

function Header() {
  const classes = styles();

  const { data: sensorData } = useSWR(SENSOR_DATA_KEY);

  const [val, setVal] = useState({ temp: 0, humid: 0, light: 0 });

  useEffect(() => {
    if (sensorData && sensorData.length) {
      const { temperature, humidity, light } =
        sensorData[sensorData.length - 1];
      setVal({
        temp: temperature,
        humid: humidity,
        light: light,
      });
    }
  }, [sensorData]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={4}>
        <Card
          className={`${classes.item} ${val.temp >= 40 ? classes.blink : ""}`}
          style={{
            background: `linear-gradient(to top right, #f44336 ${
              (val.temp - 40) * 2
            }%, #ff8a80, #ffeb3b)`,
          }}
        >
          <CardContent>
            <Typography variant="h5" className={classes.text}>
              Temperature
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" className={classes.text}>
                {val.temp?.toFixed(1)} °C
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card
          className={`${classes.item} ${val.humid >= 80 ? classes.blink : ""}`}
          style={{
            background: `linear-gradient(to top right, #0D47A1 ${
              (val.humid - 80) * 5
            }%, #2196f3, #64b5f6)`,
          }}
        >
          <CardContent>
            <Typography variant="h5" className={classes.text}>
              Humidity
            </Typography>
            <Typography variant="h6" className={classes.text}>
              {val.humid} %
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card
          className={`${classes.item} ${val.light >= 700 ? classes.blink : ""}`}
          style={{
            background: `linear-gradient(to top right, #1B5E20 ${
              (val.light - 800) * 0.2
            }%,  #4caf50 ${val.light * 0.2}%, #81c784)`,
          }}
        >
          <CardContent>
            <Typography variant="h5" className={classes.text}>
              Light
            </Typography>
            <Typography variant="h6" className={classes.text}>
              {val.light} lux
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

const styles = makeStyles((theme) => ({
  item: {
    height: "100%",
    minHeight: 170,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
  blink: {
    // opacity: 0.5,
    // animation: "$blink 1s infinite",
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
