import React from "react";
import { Container, Box, Typography } from "@mui/material";

import img from "../../assets/nar.jpg";
function Profile() {
  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
      <Box style={{ textAlign: "center" }}>
        <img
          src={img}
          alt="my avatar"
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            minWidth: "150px",
            minHeight: "150px",
            textAlign: "center",
          }}
        />
      </Box>

      <Typography style={{ textAlign: "center", marginTop: 10 }}>
        Họ tên: Trần Vân Anh
      </Typography>

      <Typography style={{ textAlign: "center", marginTop: 10 }}>
        MSV: B20DCCN075
      </Typography>

      <Typography style={{ textAlign: "center", marginTop: 10 }}>
        Lớp: D20CNPM-2
      </Typography>
    </Container>
  );
}

export default Profile;
