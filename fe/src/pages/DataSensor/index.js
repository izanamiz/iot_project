import React, { useEffect, useState } from "react";
import { Box, Container, TextField, InputAdornment } from "@mui/material";
import CustomTable from "./CustomTable";
import useSWR from "swr";
import { SENSOR_DATA_KEY } from "../../constants";
import SearchIcon from "@mui/icons-material/Search";

export default function DataSensor() {
  const { data: sensorData } = useSWR(SENSOR_DATA_KEY);
  const [data, setData] = useState();
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    const str = event.target.value;
    setSearchText(str);
    if (data && data.length) {
      if (str) {
        const res = data.filter(
          (val) =>
            val.temperature.toString().includes(str) ||
            val.humidity.toString().includes(str) ||
            val.time.toString().includes(str) ||
            val.id.toString().includes(str)
        );
        setData(res);
      } else setData(sensorData);
    }
  };

  useEffect(() => {
    if (searchText) {
      const str = searchText;
      const res = sensorData.filter(
        (val) =>
          val.temperature.toString().includes(str) ||
          val.humidity.toString().includes(str) ||
          val.light.toString().includes(str) ||
          val.time.toString().includes(str) ||
          val.id.toString().includes(str)
      );
      setData(res);
    } else {
      setData(sensorData);
    }
  }, [sensorData, searchText]);

  return (
    <Container maxWidth="xl" sx={{ marginTop: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <TextField
          id="outlined-start-adornment"
          sx={{ m: 1, width: "80%" }}
          placeholder="Search here"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={searchText}
          onChange={handleChange}
        />
      </Box>
      <CustomTable data={data} />
    </Container>
  );
}
