export const getToken = () => {
  return localStorage.get("authToken");
};

export const setToken = (token: string) => {
  localStorage.setItem("authToken", token);
};
