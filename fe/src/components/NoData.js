import React from "react";
import { Box, Typography } from "@mui/material";

import img from "../assets/noData.png";

export default function NoData() {
  return (
    <Box style={{ textAlign: "center" }}>
      <img
        src={img}
        alt="no data"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          minWidth: "150px",
          minHeight: "150px",
          textAlign: "center",
        }}
      />
      <Typography variant="h4">No Data</Typography>
    </Box>
  );
}
