import {
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  Ref,
  ref,
  watch,
} from "vue";
import _ from "lodash";
import useFriendStore from "../store/friends/useFriendStore";
import { SearchFriendMode } from "../utils/FriendService/type";

const useSearchFriends = (
  selectPage: Ref<number>,
  mode: Ref<SearchFriendMode>
) => {
  const input = ref("");
  const debounceInput = ref("");
  const fetchAt = reactive({ input: "", page: 0, maxPage: 0 });
  const { searchFriends } = useFriendStore();

  const debounceFn = _.debounce((text: string) => {
    debounceInput.value = text;
  }, 500);

  onMounted(async () => {
    const { paginationData } = await searchFriends(0, mode.value);

    if (!paginationData) {
      return;
    }

    const { all } = paginationData;
    fetchAt.page = 0;
    fetchAt.maxPage = Math.ceil(all / 30);
  });

  onUpdated(async () => {
    if (
      fetchAt.input === debounceInput.value &&
      fetchAt.page !== selectPage.value
    ) {
      fetchAt.page = selectPage.value;
      const { paginationData } = await searchFriends(
        selectPage.value,
        mode.value,
        debounceInput.value
      );
      if (!paginationData) {
        fetchAt.page = selectPage.value - 1;
        return;
      }
      const { all } = paginationData;
      fetchAt.maxPage = Math.ceil(all / 30);
    }
  });

  watch(debounceInput, async () => {
    selectPage.value = 0;
    fetchAt.page = 0;
    fetchAt.input = debounceInput.value;
    const { paginationData } = await searchFriends(
      0,
      mode.value,
      debounceInput.value
    );
    if (!paginationData) {
      return;
    }
    const { all } = paginationData;
    fetchAt.maxPage = Math.ceil(all / 30);
  });

  watch(mode, async () => {
    console.log(mode.value);
    selectPage.value = 0;
    fetchAt.page = 0;
    fetchAt.input = debounceInput.value;
    const { paginationData } = await searchFriends(
      0,
      mode.value,
      debounceInput.value
    );
    if (!paginationData) {
      return;
    }
    const { all } = paginationData;
    fetchAt.maxPage = Math.ceil(all / 30);
  });

  watch(input, async () => {
    debounceFn(input.value);
  });

  onUnmounted(() => {
    debounceFn.cancel();
  });

  return [input, fetchAt] as const;
};

export default useSearchFriends;
