const protocol = "wss";
const host = "broker.hivemq.com";
const port = "8884";
const path = "/mqtt";

export const CONNECT_URL = `${protocol}://${host}:${port}${path}`;
export const LED_TOPIC = "led_demo";
export const FAN_TOPIC = "fan_demo";
export const SENSOR_TOPIC = "sensor_demo";

export const SENSOR_DATA_KEY = "sensor.data.now";
export const LED_DATA_KEY = "led.data.now";
export const FAN_DATA_KEY = "fan.data.now";
