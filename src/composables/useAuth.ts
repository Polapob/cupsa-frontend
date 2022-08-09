import { ref } from "vue";
import authService from "../services/AuthService";
import router from "../router";
import localStorageService from "../services/LocalstorageService";

const useAuth = () => {
  const email = ref("");
  const password = ref("");

  const handleOnSubmit = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      if (response) {
        const {
          data: { success, token, result },
        } = response;
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
