import { ref } from "vue";
import authService from "../services/AuthService";
import { setToken } from "../utils/AuthService/token";
import router from "../router";

const useAuth = () => {
  const email = ref("");
  const password = ref("");

  const handleOnSubmit = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      console.log("pass-this!");
      if (response) {
        const {
          data: { success, token, result },
        } = response;
        if (success) {
          setToken(token);
          router.push("/check-friend");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return [handleOnSubmit, email, password] as const;
};
export default useAuth;
