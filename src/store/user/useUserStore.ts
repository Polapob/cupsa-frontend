import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import authService from "../../services/AuthService";
import { defaultUserData, LoadingStatus } from "../type";
import { UserResult } from "../../utils/UserService/type";
import { LoginForm } from "../../utils/Login/type";
import router from "../../router";

const useUserStore = defineStore("user", () => {
  const userData = ref<UserResult>(defaultUserData);
  const loadingStatus = ref<LoadingStatus>(LoadingStatus.IDLE);
  const errorMessage = ref<string>("");

  onMounted(() => {
    const localstorageUser = localStorage.getItem("userData");
    if (localstorageUser) {
      userData.value = JSON.parse(localstorageUser);
    }
  });

  const login = async (loginBody: LoginForm) => {
    try {
      loadingStatus.value = LoadingStatus.LOADING;
      const response = await authService.login(loginBody);
      if (!response) {
        return { token: "" };
      }
      userData.value = response.data.result;
      localStorage.setItem("userData", JSON.stringify(response.data.result));
      loadingStatus.value = LoadingStatus.FINISH;
      return { token: response.data.token };
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      loadingStatus.value = LoadingStatus.ERROR;
      errorMessage.value = axiosError.response?.data.message || "";
      return { token: "" };
    }
  };

  const logout = () => {
    userData.value = defaultUserData;
    localStorage.setItem("userData", "");
    localStorage.setItem("authToken", "");
    router.push("/");
  };

  const checkMemberStatus = computed(() => {
    return Boolean(parseInt(userData.value.is_member));
  });

  const isUserLogin = computed(() => {
    return userData.value.first_name !== "";
  });

  const getFirstName = computed(() => {
    return userData.value.first_name;
  });

  return { userData, loadingStatus, errorMessage, getFirstName, checkMemberStatus, isUserLogin, login, logout };
});

export default useUserStore;

/*export const useUserStore = defineStore("user", {
  state: () => ({
    userData: defaultUserData as ILoginResult,
    loadingStatus: LoadingStatus.IDLE,
    errorMessage: "",
  }),
  actions: {
    async login(loginBody: LoginFormTypes) {
      try {
        this.loadingStatus = LoadingStatus.LOADING;
        const response = await authService.login(loginBody);
        if (!response) {
          return;
        }
        this.userData = response.data.result;
        console.log("userData =", this.userData);
        this.loadingStatus = LoadingStatus.FINISH;
      } catch (err) {
        const axiosError = err as AxiosError<{ message: string }>;
        this.loadingStatus = LoadingStatus.ERROR;
        this.errorMessage = axiosError.response?.data.message || "";
      }
    },
  },
}); */
