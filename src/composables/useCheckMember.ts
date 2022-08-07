import { onMounted, ref } from "vue";
import userService from "../services/UserService";

const useCheckMember = () => {
  const isMember = ref(false);

  onMounted(async () => {
    try {
      const data = await userService.checkMember();
      if (data?.isMember) {
        isMember.value = data.isMember;
      }
    } catch (err) {
      console.log(err);
    }
  });

  return [isMember];
};

export default useCheckMember;
