import { ref } from "vue";
import authService from "../services/AuthService";
import router from "../router";
import localStorageService from "../services/LocalstorageService";
import userStore from "../store/user/model";

const useAuth = () => {
  const email = ref("");
  const password = ref("");
  const { login } = userStore;

  const handleOnSubmit = async (email: string, password: string) => {
    try {
      const response = await login({ email, password });
      if (response) {
        const { success, token } = response;
        if (success) {
          localStorageService.set("authToken", token);
          router.push("/search-friends");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return [handleOnSubmit, email, password] as const;
};
export default useAuth;
