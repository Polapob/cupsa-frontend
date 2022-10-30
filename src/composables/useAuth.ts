import { computed, ComputedRef, Ref, ref } from "vue";
import router from "../router";
import localStorageService from "../services/LocalstorageService";
import { LoginForm } from "../utils/Login/type";
import useUserStore from "../store/user/useUserStore";
import { storeToRefs } from "pinia";
import { LoadingStatus } from "../store/type";

interface IAuthResult {
  username: Ref<string>;
  password: Ref<string>;
  isLoading: ComputedRef<boolean>;
  isError: ComputedRef<boolean>;
  handleOnSubmit: (formData: LoginForm) => Promise<void>;
}

const useAuth = (): IAuthResult => {
  const username = ref("");
  const password = ref("");
  const userStore = useUserStore();
  const { loadingStatus } = storeToRefs(userStore);
  const { login } = userStore;
  const isLoading = computed(() => loadingStatus.value === LoadingStatus.LOADING);
  const isError = computed(() => loadingStatus.value === LoadingStatus.ERROR);
  const handleOnSubmit = async (formData: LoginForm) => {
    try {
      const { token } = await login(formData);
      if (token) {
        localStorageService.set("authToken", token);
        router.push("/search-friends");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { handleOnSubmit, username, password, isLoading, isError };
};
export default useAuth;
