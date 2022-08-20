import { onMounted, onUnmounted, onUpdated, reactive, Ref, ref, watch } from "vue";
import _ from "lodash";
import friendStore from "../store/friends/model";

const useSearchFriends = (selectPage: Ref<number>) => {
  const input = ref("");
  const debounceInput = ref("");
  const fetchAt = reactive({ input: "", page: 0, maxPage: 0 });
  const numberOfFriends = ref(0);
  const { searchFriends } = friendStore;

  const debounceFn = _.debounce((text: string) => {
    debounceInput.value = text;
  }, 300);

  onMounted(async () => {
    const fetchFriends = await searchFriends(0);

    if (!fetchFriends) {
      return;
    }

    const {
      paginationData: { all },
    } = fetchFriends;
    numberOfFriends.value = friendStore.friends.length;
    fetchAt.page = 0;
    fetchAt.maxPage = Math.ceil(all / 30);
  });

  onUpdated(async () => {
    if (fetchAt.input === debounceInput.value && fetchAt.page !== selectPage.value) {
      const fetchFriends = await searchFriends(selectPage.value, debounceInput.value);
      if (!fetchFriends) {
        return;
      }

      const {
        paginationData: { all },
      } = fetchFriends;
      numberOfFriends.value = friendStore.friends.length;
      fetchAt.page = selectPage.value;
      fetchAt.maxPage = Math.ceil(all / 30);
    }
  });

  watch(debounceInput, async () => {
    selectPage.value = 0;
    const fetchFriends = await searchFriends(0, debounceInput.value);

    if (!fetchFriends) {
      return;
    }

    const {
      paginationData: { all },
    } = fetchFriends;
    numberOfFriends.value = friendStore.friends.length;
    fetchAt.page = 0;
    fetchAt.maxPage = Math.ceil(all / 30);
  });

  watch(input, async () => {
    debounceFn(input.value);
  });

  onUnmounted(() => {
    debounceFn.cancel;
  });

  return [input, fetchAt, numberOfFriends] as const;
};

export default useSearchFriends;
