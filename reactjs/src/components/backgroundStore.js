export const Setbg = () => {
  return JSON.parse(localStorage.getItem("background"))?.bgurl;
};

