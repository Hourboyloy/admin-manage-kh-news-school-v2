export const IsLoggedIn = () => {
  return localStorage.getItem("isLogin");
};

export const User_access_token = () => {
  return localStorage.getItem("user_access_token");
};
export const Admin_access_token = () => {
  return localStorage.getItem("admin_access_token");
};
