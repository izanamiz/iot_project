import {
  Box,
  IconButton,
  Card,
  Stack,
  Switch,
  Typography,
  CardContent,
} from "@mui/material";
import React, { useState } from "react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { makeStyles } from "@mui/styles";

function LightControl() {
  const classes = styles();

  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Card className={classes.item}>
      <CardContent>
        <Box className={classes.iconWrapper}>
          <IconButton>
            <LightbulbIcon
              sx={{ width: 75, height: 75, color: checked ? "yellow" : "#fff" }}
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
}));

export default LightControl;
