import React, { useEffect } from "react";
import { Box } from "@mui/material";
import StickyHeadTable from "../../components/StickyHeadTable";

function LightEvent({ lightControlEvent }) {
  useEffect(() => {
    console.log(lightControlEvent);
  }, [lightControlEvent]);

  return (
    <Box style={{ marginTop: 20 }}>
      <StickyHeadTable data={lightControlEvent} />
    </Box>
  );
}

export default LightEvent;
