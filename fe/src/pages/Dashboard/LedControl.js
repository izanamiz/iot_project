import {
  Box,
  IconButton,
  Card,
  Stack,
  Switch,
  Typography,
  CardContent,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import useSWR from "swr";
import mqtt from "precompiled-mqtt";
import { CONNECT_URL, LED_DATA_KEY, LED_TOPIC } from "../../constants";
import { publishToTopic } from "../../utils";
import dayjs from "dayjs";
import { addNewActionData, getLedActionData } from "../../services";

function LedControl() {
  const theme = useTheme();
  const classes = styles();

  const client = mqtt.connect(CONNECT_URL);

  const { data: ledData, mutate: mutateLedData } = useSWR(LED_DATA_KEY);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // console.log("led data: ", ledData);

    if (ledData && ledData.length) {
      const { mode } = ledData[ledData.length - 1];
      mode === "on" ? setChecked(true) : setChecked(false);
    } else setChecked(false);
  }, []);

  const handleChange = useCallback(async (event) => {
    setChecked(event.target.checked);
    publishToTopic(client, LED_TOPIC, event.target.checked ? "on" : "off");

    await addNewActionData({
      device: "led",
      mode: event.target.checked ? "on" : "off",
      time: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    });

    await getLedActionData().then((data) => {
      console.log("data", data);
      data && mutateLedData(data);
    });
  }, []);

  return (
    <Card className={classes.item}>
      <CardContent>
        <Box className={classes.iconWrapper}>
          <IconButton onClick={() => setChecked(!checked)}>
            <LightbulbIcon
              sx={{
                width: 75,
                height: 75,
                color: checked
                  ? "yellow"
                  : theme.palette.mode === "dark"
                  ? "#fff"
                  : "#000",
              }}
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
}));

export default LedControl;
