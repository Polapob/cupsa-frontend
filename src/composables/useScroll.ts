import _ from "lodash";
import { onMounted, onUnmounted, Ref } from "vue";
import calculateScrollData from "../utils/Composables/useScroll/calculateScrollData";

interface IUserScrollInterface {
  fetchAt: {
    input: string;
    page: number;
    maxPage: number;
  };
  selectPage: Ref<number>;
  numberOfFriends: number;
}

const useScroll = ({ numberOfFriends, selectPage, fetchAt }: IUserScrollInterface) => {
  function onScroll() {
    const { scrollPosition, bottomPosition, scrollRatio } = calculateScrollData();

    if (scrollRatio >= 0.8 && numberOfFriends > 0 && selectPage.value < fetchAt.maxPage - 1) {
      selectPage.value++;
    }
  }

  const fn = _.debounce(() => {
    onScroll();
  }, 300);

  onMounted(() => {
    window.addEventListener("scroll", () => {
      fn();
    });
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", () => {
      fn.cancel();
    });
  });

  return [] as const;
};

export default useScroll;
