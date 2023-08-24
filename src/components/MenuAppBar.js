import * as React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function MenuAppBar({ isDarkMode, setIsDarkMode }) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton size="large" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IoT
          </Typography>

          <IconButton size="large" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <IconButton size="large">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
