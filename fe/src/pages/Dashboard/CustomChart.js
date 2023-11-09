import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useSWR from "swr";
import { SENSOR_DATA_KEY } from "../../constants";
import { formatTime } from "../../utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sensors Line Chart",
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "Time",
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Value",
      },
    },
  },
};

const genData = (val) => {
  const data = val.length > 10 ? val.slice(-10) : val;
  const tempList = data.map((val) => val.temperature);
  const humidList = data.map((val) => val.humidity);
  const lightList = data.map((val) => val.light);

  const timeList = data.map((val) => {
    const res = val?.time
      ? formatTime(val?.time)?.split(" ")[1].slice(0, 8)
      : " ";
    return res;
  });

  const labels = timeList;

  return {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: tempList,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Humidity",
        data: humidList,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Light",
        data: lightList,
        borderColor: "rgb(29, 233, 182)",
        backgroundColor: "rgba(29, 233, 182, 0.5)",
      },
    ],
  };
};

function CustomChart() {
  const { data: sensorData } = useSWR(SENSOR_DATA_KEY);
  return sensorData && sensorData.length && sensorData[0] ? (
    <Line options={options} data={genData(sensorData)} />
  ) : (
    <></>
  );
}

export default CustomChart;
