import React, { useEffect, useState} from "react";
import {
  Container,
  Box,
  Typography,
  Breadcrumbs,
  useTheme,
} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";

function Events() {
  const location = useLocation();

  const theme = useTheme();

  const [color, setColor] = useState("#000");

  useEffect(() => {
    const res = theme.palette.mode === "dark" ? "#fff" : "#000";
    setColor(res);
  }, [theme]);

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
      <Breadcrumbs aria-label="breadcrumb">
        {[
          { name: "Light", route: "/events/light" },
          {
            name: "Fan",
            route: "/events/fan",
          },
        ].map((val, idx) => (
          <Link
            to={val.route}
            key={idx}
            style={{
              color:
                location.pathname === val.route ||
                (location.pathname === "/events" &&
                  val.route === "/events/light")
                  ? "rgb(0, 127, 255)"
                  : color,
              textDecoration: "none",
            }}
          >
            {val.name}
          </Link>
        ))}
      </Breadcrumbs>
      <Outlet />
    </Container>
  );
}

export default Events;
