import { ref } from "vue";

const useEnterPress = () => {
  const buttonRef = ref<null | HTMLButtonElement>(null);

  const handleEnterpress = () => {
    if (!buttonRef.value) {
      return;
    }
    buttonRef.value.click();
  };
  return [buttonRef, handleEnterpress] as const;
};

export default useEnterPress;
