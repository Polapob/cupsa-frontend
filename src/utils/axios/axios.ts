import { data } from "autoprefixer";
import axios, { AxiosError } from "axios";
import persist from "mst-persist";
import router from "../../router";
import localStorageService from "../../services/LocalstorageService";
import useUserStore from "../../store/user/useUserStore";
import { IErrorResponse } from "./axiosError.type";

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

apiClient.interceptors.response.use(undefined, async (err: AxiosError<IErrorResponse>) => {
  console.log("error =", err);
  if (err?.response?.status === 400 && err?.response?.data?.message.includes("token")) {
    localStorageService.set("authToken", "");
    const { logout } = useUserStore();
    logout();
    window.location.reload();
    router.push("/login");
  }
});

export default apiClient;
