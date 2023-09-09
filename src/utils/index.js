export const saveToLocalStorage = (item, data) => {
  localStorage.setItem(item, JSON.stringify(data));
};

export const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
