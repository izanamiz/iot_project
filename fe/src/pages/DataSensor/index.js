import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  Chip,
} from "@mui/material";
import CustomTable from "./CustomTable";
import useSWR from "swr";
import { SENSOR_DATA_KEY } from "../../constants";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";

const filter = ["Id", "Temperature", "Humidity", "Light", "Time"];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DataSensor() {
  const { data: sensorData } = useSWR(SENSOR_DATA_KEY);
  const [data, setData] = useState();
  const [searchText, setSearchText] = useState("");
  const [filterBy, setFilterBy] = useState(filter);

  const hanldeChangeFilterBy = (event) => {
    const {
      target: { value },
    } = event;
    setFilterBy(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeSearchText = (event) => {
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
    if (sensorData && sensorData.length) {
      if (searchText) {
        const str = searchText;
        const res = sensorData.filter(
          (val) =>
            (filterBy.includes("Temperature") &&
              val.temperature.toString().includes(str)) ||
            (filterBy.includes("Humidity") &&
              val.humidity.toString().includes(str)) ||
            (filterBy.includes("Light") &&
              val.light.toString().includes(str)) ||
            (filterBy.includes("Time") && val.time.toString().includes(str)) ||
            (filterBy.includes("Id") && val.id.toString().includes(str))
        );
        setData(res);
      } else {
        setData(sensorData);
      }
    }
  }, [filterBy, sensorData, searchText]);

  return (
    <Container maxWidth="xl" sx={{ marginTop: 2 }}>
      <Grid container justifyContent={"center"} spacing={3}>
        <Grid item md={6} sm={12}>
          <TextField
            id="outlined-start-adornment"
            sx={{ m: 1, width: "100%" }}
            placeholder="Search here"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={searchText}
            onChange={handleChangeSearchText}
          />
        </Grid>
        <Grid item md={3} sm={6}>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-multiple-chip-label">Search by</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={filterBy}
              onChange={hanldeChangeFilterBy}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {filter.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <CustomTable data={data} />
    </Container>
  );
}
