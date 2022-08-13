import axios from "axios";
import localStorageService from "../../services/LocalstorageService";

const apiClient = axios.create({
  baseURL: "https://www.triamudom-alumni.org/member",
});

apiClient.interceptors.request.use(
  async (config) => {
    const authToken = localStorageService.get("authToken");
    config.params = {
      ...config.params,
      token: authToken,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default apiClient;
