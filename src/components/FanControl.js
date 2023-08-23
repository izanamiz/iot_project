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
import FanSvg from "../assets/fan.svg";

function FanControl() {
  const classes = styles();

  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Card className={classes.item}>
      <CardContent>
        <Box className={classes.iconWrapper}>
          <IconButton className={checked ? classes.rotatingIcon : ""}>
            <img
              src={FanSvg}
              alt="Fan icon"
              style={{ width: 75, height: 75 }}
            />
          </IconButton>
        </Box>

        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography>ON</Typography>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography>OFF</Typography>
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
