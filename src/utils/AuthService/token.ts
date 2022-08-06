export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const setToken = (token: string) => {
  localStorage.setItem("authToken", token);
};
