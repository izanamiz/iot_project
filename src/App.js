import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { darkTheme, lightTheme } from "./configs";
import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MenuAppBar from "./components/MenuAppBar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import LightEvent from "./pages/Events/LightEvent";
import FanEvent from "./pages/Events/FanEvent";
import dayjs from "dayjs";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [lightControlEvent, setLightControlEvent] = useState([
    { mode: "ON", time: dayjs().format("HH:mm:ss DD-MM-YYYY") },
  ]);
  const [fanControlEvent, setFanControlEvent] = useState([
    { mode: "ON", time: dayjs().format("HH:mm:ss DD-MM-YYYY") },
  ]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      <MenuAppBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Router  */}
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              setLightControlEvent={setLightControlEvent}
              setFanControlEvent={setFanControlEvent}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/events" element={<Events />}>
          <Route
            path=""
            element={<LightEvent lightControlEvent={lightControlEvent} />}
          />
          <Route
            path="light"
            element={<LightEvent lightControlEvent={lightControlEvent} />}
          />
          <Route
            path="fan"
            element={<FanEvent fanControlEvent={fanControlEvent} />}
          />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
