import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import FanDarkSvg from "../../assets/fanDark.svg";
import FanLightSvg from "../../assets/fanLight.svg";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";

function FanControl({ setFanControlEvent }) {
  const theme = useTheme();

  const classes = styles();

  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setFanControlEvent((prev) => [
      ...prev,
      {
        mode: event.target.checked ? "ON" : "OFF",
        time: dayjs().format("HH:mm:ss DD-MM-YYYY"),
      },
    ]);
    setChecked(event.target.checked);
  };

  return (
    <Card className={classes.item}>
      <CardContent>
        <Box className={classes.iconWrapper}>
          <IconButton
            className={checked ? classes.rotatingIcon : ""}
            onClick={() => setChecked(!checked)}
          >
            <img
              src={theme.palette.mode === "dark" ? FanDarkSvg : FanLightSvg}
              alt="Fan icon"
              style={{ width: 75, height: 75, color: "red" }}
            />
          </IconButton>
        </Box>

        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography>OFF</Typography>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography>ON</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

const styles = makeStyles((theme) => ({
  item: {
    height: "100%",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  rotatingIcon: {
    animation: "spin 2s linear infinite",
  },
}));

export default FanControl;
