import React, { useEffect, useState } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import useSWR from "swr";
import { FAN_DATA_KEY } from "../../constants";
import CustomTable from "./CustomTable";
import SearchIcon from "@mui/icons-material/Search";

function FanEvent() {
  const { data: fanData } = useSWR(FAN_DATA_KEY);
  const [data, setData] = useState();
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    const str = event.target.value;
    setSearchText(str);
    if (data && data.length) {
      if (str) {
        const res = data.filter(
          (val) =>
            val.mode.toString().includes(str) ||
            val.time.toString().includes(str) ||
            val.id.toString().includes(str)
        );
        setData(res);
      } else setData(fanData);
    }
  };

  useEffect(() => {
    if (searchText) {
      const str = searchText;
      const res = fanData.filter(
        (val) =>
          val.mode.toString().includes(str) ||
          val.time.toString().includes(str) ||
          val.id.toString().includes(str)
      );
      setData(res);
    } else {
      setData(fanData);
    }
  }, [fanData, searchText]);

  return (
    <Box style={{ marginTop: 20 }}>
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
    </Box>
  );
}

export default FanEvent;
