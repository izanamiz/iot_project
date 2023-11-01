import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import FanDarkSvg from "../../assets/fanDark.svg";
import FanLightSvg from "../../assets/fanLight.svg";
import { useTheme } from "@mui/material/styles";
import useSWR from "swr";
import mqtt from "precompiled-mqtt";
import { CONNECT_URL, FAN_DATA_KEY, FAN_TOPIC } from "../../constants";
import { publishToTopic } from "../../utils";
import dayjs from "dayjs";
import { addNewActionData, getFanActionData } from "../../services";

function FanControl() {
  const theme = useTheme();
  const classes = styles();

  const client = mqtt.connect(CONNECT_URL);

  const { data: fanData, mutate: mutateFanData } = useSWR(FAN_DATA_KEY);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // console.log("fan data: ", fanData)
    if (fanData) {
      const { mode } = fanData[fanData.length - 1];
      mode === "on" ? setChecked(true) : setChecked(false);
    }
  }, []);

  const handleChange = useCallback((event) => {
    publishToTopic(client, FAN_TOPIC, event.target.checked ? "on" : "off");
    addNewActionData({
      device: "fan",
      mode: event.target.checked ? "on" : "off",
      time: dayjs().format("YYYY-MM-DDTHH:mm:ssZ"),
    });
    getFanActionData().then((data) => {
      data && mutateFanData(data);
    });

    setChecked(event.target.checked);
  }, []);

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
    minHeight: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
