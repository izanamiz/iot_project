import React, { useEffect, useState } from "react";
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
      text: "Chart.js Line Chart",
    },
  },
};

const genData = (tempList, humidList, lightList) => {
  const labels = tempList.map((_, idx) => idx * 5);
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
        label: "Humid",
        data: humidList,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Light",
        data: lightList,
        borderColor: "rgb(29, 233, 182)",
        backgroundColor: "rgba(29, 233, 182,0.5)",
      },
    ],
  };
};

function CustomChart({ tempList, humidList, lightList }) {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    setData(genData(tempList, humidList, lightList));
  }, [tempList, humidList, lightList]);

  return data ? <Line options={options} data={data} /> : <></>;
}

export default CustomChart;
