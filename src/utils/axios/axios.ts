import axios from "axios";
import { getToken } from "../AuthService/token";

const apiClient = axios.create({
  baseURL: "https://www.triamudom-alumni.org/member",
});

apiClient.interceptors.request.use(
  async (config) => {
    const authToken = getToken();
    config.params = {
      token: authToken,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default apiClient;
