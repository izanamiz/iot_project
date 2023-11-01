import React from "react";
import { Box, Container, Grid } from "@mui/material";
import Header from "./Header";
import CustomChart from "./CustomChart";
import FanControl from "./FanControl";
import LedControl from "./LedControl";

function Dashboard() {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 3 }}>
        <Header />

        <Grid container spacing={5} sx={{ paddingTop: 5 }}>
          {/* Chart  */}
          <Grid item xs={12} sm={12} md={8} order={{ xs: 2, md: 1 }}>
            <CustomChart />
          </Grid>

          {/* Control  */}
          <Grid item xs={12} sm={12} md={4} order={{ xs: 1, md: 2 }}>
            <Grid container spacing={5}>
              <Grid item xs={6} sm={6} md={12}>
                <LedControl />
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

export default Dashboard;
