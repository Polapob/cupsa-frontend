import { ref } from "vue";
import router from "../router";
import localStorageService from "../services/LocalstorageService";
import { LoginFormDataTypes } from "../utils/Login/type";
import useUserStore from "../store/user/useUserStore";

const useAuth = () => {
  const email = ref("");
  const password = ref("");
  const { login } = useUserStore();
  const handleOnSubmit = async (formData: LoginFormDataTypes) => {
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

  return [handleOnSubmit, email, password] as const;
};
export default useAuth;
