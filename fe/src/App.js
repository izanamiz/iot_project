import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./configs";
import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MenuAppBar from "./components/MenuAppBar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import FanEvent from "./pages/Events/FanEvent";
import DataSensor from "./pages/DataSensor";

import dayjs from "dayjs";
import { publishToTopic, subscribeToTopic } from "./utils";
import {
  CONNECT_URL,
  FAN_DATA_KEY,
  FAN_TOPIC,
  LED_DATA_KEY,
  LED_TOPIC,
  SENSOR_DATA_KEY,
  SENSOR_TOPIC,
} from "./constants";
import mqtt from "precompiled-mqtt";
import useSWR from "swr";
import LedEvent from "./pages/Events/LedEvent";
import {
  addNewSensorData,
  getFanActionData,
  getLedActionData,
  getSensorData,
} from "./services";

function App() {
  const client = mqtt.connect(CONNECT_URL);

  const { mutate: mutateSensorData } = useSWR(SENSOR_DATA_KEY);
  const { mutate: mutateLedData } = useSWR(LED_DATA_KEY);
  const { mutate: mutateFanData } = useSWR(FAN_DATA_KEY);

  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    getSensorData().then((data) => {
      data && mutateSensorData(data);
    });
    getFanActionData().then((data) => {
      data && mutateFanData(data);
    });
    getLedActionData().then((data) => {
      data && mutateLedData(data);
    });
  }, []);

  useEffect(() => {
    client.on("connect", () => {
      subscribeToTopic(client, SENSOR_TOPIC);
    });

    client.on("message", (topic, message) => {
      if (topic === SENSOR_TOPIC) {
        try {
          const data = JSON.parse(message);
          addNewSensorData({
            ...data,
            time: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          });
          getSensorData().then((data) => {
            data && mutateSensorData(data);
          });
        } catch (e) {
          console.error("Error:", e);
        }
      }
    });

    return () => {
      publishToTopic(client, FAN_TOPIC, "off");
      publishToTopic(client, LED_TOPIC, "off");
    };
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      <MenuAppBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      {/* Router  */}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/data-sensor" element={<DataSensor />} />
        <Route path="/events" element={<Events />}>
          <Route path="" element={<LedEvent />} />
          <Route path="led" element={<LedEvent />} />
          <Route path="fan" element={<FanEvent />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
