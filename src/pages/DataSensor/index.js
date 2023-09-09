import React from "react";
import { Box } from "@mui/material";
import CustomTable from "./CustomTable";
import { useEffect } from "react";
import { useState } from "react";

export default function DataSensor({ tempList, humidList, lightList }) {
  const [data, setData] = useState([{ temp: "", humid: "", light: "" }]);
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < tempList.length; i++) {
      arr.push({ temp: tempList[i], humid: humidList[i], light: lightList[i] });
    }
    setData(arr);
  }, []);
  return (
    <Box style={{ marginTop: 20 }}>
      <CustomTable data={data} />
    </Box>
  );
}
