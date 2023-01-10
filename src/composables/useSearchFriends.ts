import { onMounted, onUnmounted, onUpdated, reactive, Ref, ref, watch } from "vue";
import _ from "lodash";
import useFriendStore from "../store/friends/useFriendStore";

const useSearchFriends = (selectPage: Ref<number>, includeAll: Ref<boolean>) => {
  const input = ref("");
  const debounceInput = ref("");
  const fetchAt = reactive({ input: "", page: 0, maxPage: 0 });
  const { searchFriends } = useFriendStore();

  const debounceFn = _.debounce((text: string) => {
    debounceInput.value = text;
  }, 500);

  onMounted(async () => {
    const { paginationData } = await searchFriends(0);

    if (!paginationData) {
      return;
    }

    const { all } = paginationData;
    fetchAt.page = 0;
    fetchAt.maxPage = Math.ceil(all / 30);
  });

  onUpdated(async () => {
    if (fetchAt.input === debounceInput.value && fetchAt.page !== selectPage.value) {
      fetchAt.page = selectPage.value;
      const { paginationData } = await searchFriends(selectPage.value, debounceInput.value);
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
    const { paginationData } = await searchFriends(0, debounceInput.value);
    if (!paginationData) {
      return;
    }
    const { all } = paginationData;
    fetchAt.maxPage = Math.ceil(all / 30);
  });

  watch(includeAll, async () => {
    selectPage.value = 0;
    fetchAt.page = 0;
    fetchAt.input = debounceInput.value;
    const { paginationData } = await searchFriends(0, debounceInput.value);
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
