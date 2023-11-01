import { httpRequest } from "../configs";

export const getLedActionData = async () => {
  try {
    const res = await httpRequest.get("/action");
    const ans = res.data.filter((val) => {
      return val.device === "led";
    });
    return ans;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getFanActionData = async () => {
  try {
    const res = await httpRequest.get("/action");
    const ans = res.data.filter((val) => {
      return val.device === "fan";
    });
    return ans;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addNewActionData = async (data) => {
  const body = {
    device: data.device,
    mode: data.mode,
    time: data.time,
  };
  try {
    const res = await httpRequest.post("/action", body);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
