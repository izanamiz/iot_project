import { httpRequest } from "../configs";

export const getSensorData = async () => {
  try {
    const res = await httpRequest.get("/sensor");
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addNewSensorData = async (data) => {
  const time = data.time;
  // console.log("time send:", time);
  const body = {
    temperature: data.temperature,
    humidity: data.humidity,
    light: data.light,
    time: time,
  };
  try {
    const res = await httpRequest.post("/sensor", body);
    // console.log("time receive:", res.data.time);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
