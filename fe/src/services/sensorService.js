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
  const body = {
    temperature: data.temperature,
    humidity: data.humidity,
    light: data.light,
    time: data.time,
  };
  try {
    const res = await httpRequest.post("/sensor", body);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
