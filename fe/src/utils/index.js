export const saveToLocalStorage = (item, data) => {
  localStorage.setItem(item, JSON.stringify(data));
};

export const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const subscribeToTopic = (client, topic) => {
  client.subscribe(topic, (err) => {
    if (err) {
      console.error(`Lỗi khi subscribe vào topic ${topic}: `, err);
    } else {
      console.log(`Đã subscribe vào chủ đề ${topic}`);
    }
  });
};

export const publishToTopic = (client, topic, message) => {
  client.publish(topic, message, (err) => {
    if (err) {
      console.error("Lỗi khi publish tin nhắn:", err);
    } else {
      console.log(`Đã gửi dữ liệu lên topic ${topic}: `, message);
    }
  });
};

export const formatTime = (val) => {
  // 2023-11-01T23:12:56+07:00Z
  const arr = val.split("T");
  const hour = arr[1].split("+")[0];
  const time = arr[0] + " " + hour;
  return time;
};
