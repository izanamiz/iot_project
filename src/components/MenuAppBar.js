import React, { useEffect, useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";

export default function MenuAppBar({ isDarkMode, setIsDarkMode }) {
  const theme = useTheme();

  const location = useLocation();

  const [isOpened, setIsOpened] = useState(false);
  const [color, setColor] = useState("#000");

  useEffect(() => {
    const res = theme.palette.mode === "dark" ? "#fff" : "#000";
    setColor(res);
  }, [theme]);

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpened(!isOpened);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton size="large" sx={{ mr: 2 }} onClick={toggleDrawer()}>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SENSOR MANAGEMENT
            </Typography>

            <IconButton size="large" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {/* <IconButton size="large">
              <AccountCircle />
            </IconButton> */}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="left" open={isOpened} onClose={toggleDrawer()}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer()}
          onKeyDown={toggleDrawer()}
        >
          <List>
            {[
              { name: "Dashboard", route: "/", iconEle: <DashboardIcon /> },
              { name: "Profile", route: "/profile", iconEle: <PersonIcon /> },
              {
                name: "Data Sensor",
                route: "/data-sensor",
                iconEle: <DashboardIcon />,
              },
              {
                name: "Events",
                route: "/events",
                iconEle: <ManageHistoryIcon />,
              },
            ].map((val, idx) => (
              <Link
                key={idx}
                to={val.route}
                style={{
                  color:
                    location.pathname === val.route
                      ? "rgb(0, 127, 255)"
                      : color,
                  textDecoration: "none",
                }}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon
                      style={{
                        color:
                          location.pathname === val.route
                            ? "rgb(0, 127, 255)"
                            : color,
                      }}
                    >
                      {val.iconEle}
                    </ListItemIcon>
                    <ListItemText primary={val.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
