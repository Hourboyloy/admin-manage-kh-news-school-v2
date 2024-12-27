export const id_bg = () => {
  return JSON.parse(localStorage.getItem("background"))?._id;
};