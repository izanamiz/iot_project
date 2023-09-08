import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import Header from "./Header";
import CustomChart from "./CustomChart";
import LightControl from "./LightControl";
import FanControl from "./FanControl";

const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function Dashboard({ setLightControlEvent, setFanControlEvent }) {
  const storedTempList = JSON.parse(localStorage.getItem("tempList")) || [30];
  const storedHumidList = JSON.parse(localStorage.getItem("humidList")) || [50];
  const storedLightList = JSON.parse(localStorage.getItem("lightList")) || [68];

  const [tempList, setTempList] = useState(storedTempList);
  const [humidList, setHumidList] = useState(storedHumidList);
  const [lightList, setLightList] = useState(storedLightList);

  useEffect(() => {
    setTempList(storedTempList);
    setHumidList(storedTempList);
    setLightList(storedLightList);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const temp1 = getRandomValue(1, 100);
      setTempList((prev) => [...prev, temp1]);

      const humid1 = getRandomValue(1, 100);
      setHumidList((prev) => [...prev, humid1]);

      const light1 = getRandomValue(1, 100);
      setLightList((prev) => [...prev, light1]);

      localStorage.setItem(
        "tempList",
        JSON.stringify([...storedTempList, temp1])
      );
      localStorage.setItem(
        "humidList",
        JSON.stringify([...storedHumidList, humid1])
      );
      localStorage.setItem(
        "lightList",
        JSON.stringify([...storedLightList, light1])
      );
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
        <Header
          temp={tempList[tempList.length - 1]}
          humid={humidList[humidList.length - 1]}
          light={lightList[lightList.length - 1]}
        />

        <Grid container spacing={3} sx={{ paddingTop: 3 }}>
          {/* Chart  */}
          <Grid item xs={12} sm={12} md={8} order={{ xs: 2, md: 1 }}>
            <CustomChart
              tempList={tempList}
              humidList={humidList}
              lightList={lightList}
            />
          </Grid>

          {/* Control  */}
          <Grid item xs={12} sm={12} md={4} order={{ xs: 1, md: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6} md={12}>
                <LightControl setLightControlEvent={setLightControlEvent} />
              </Grid>

              <Grid item xs={6} sm={6} md={12}>
                <FanControl setFanControlEvent={setFanControlEvent} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard;
