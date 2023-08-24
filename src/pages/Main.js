import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import MenuAppBar from "../components/MenuAppBar";
import TopNav from "../components/TopNav";
import Chart from "../components/Chart";
import LightControl from "../components/LightControl";
import FanControl from "../components/FanControl";

const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function Main() {
  const [tempList, setTempList] = useState([30]);
  const [humidList, setHumidList] = useState([50]);
  const [lightList, setLightList] = useState([68]);

  useEffect(() => {
    const interval = setInterval(() => {
      const temp1 = getRandomValue(1, 100);
      setTempList((prev) => [...prev, temp1]);

      const humid1 = getRandomValue(1, 100);
      setHumidList((prev) => [...prev, humid1]);

      const light1 = getRandomValue(1, 100);
      setLightList((prev) => [...prev, light1]);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
        <TopNav
          temp={tempList[tempList.length - 1]}
          humid={humidList[humidList.length - 1]}
          light={lightList[lightList.length - 1]}
        />

        <Grid container spacing={3} sx={{ paddingTop: 3 }}>
          {/* Chart  */}
          <Grid item xs={12} sm={12} md={8} order={{ xs: 2, md: 1 }}>
            <Chart
              tempList={tempList}
              humidList={humidList}
              lightList={lightList}
            />
          </Grid>

          {/* Control  */}
          <Grid item xs={12} sm={12} md={4} order={{ xs: 1, md: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6} md={12}>
                <LightControl />
              </Grid>

              <Grid item xs={6} sm={6} md={12}>
                <FanControl />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Main;
