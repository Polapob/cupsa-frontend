import { onMounted, onUnmounted, onUpdated, reactive, Ref, ref, watch } from "vue";
import friendService from "../services/FriendService";
import processFriendData from "../utils/FriendService/processFriendData";
import { useQuery } from "vue-query";
import { FriendDataTypes } from "../utils/Composables/useSearchFriends/type";
import _ from "lodash";

const useSearchFriends = (selectPage: Ref<number>) => {
  const friends = reactive({ data: [] as FriendDataTypes[] });
  const input = ref("");
  const debounceInput = ref("");
  const fetchAt = reactive({ input: "", page: 0, maxPage: 0 });

  const debounceFn = _.debounce((text: string) => {
    console.log("debounce input =", text);
    debounceInput.value = text;
  }, 300);

  onMounted(async () => {
    const fetchFriends = await friendService.searchFriends(0);

    if (!fetchFriends) {
      return;
    }

    const {
      data,
      paginationData: { all },
    } = processFriendData(fetchFriends);
    friends.data = data;
    fetchAt.page = 0;
    fetchAt.maxPage = Math.ceil(all / 30);
  });

  onUpdated(async () => {
    if (fetchAt.input === debounceInput.value && fetchAt.page !== selectPage.value) {
      const fetchFriends = await friendService.searchFriends(selectPage.value, debounceInput.value);
      if (!fetchFriends) {
        return;
      }

      const {
        data,
        paginationData: { all },
      } = processFriendData(fetchFriends);
      friends.data = friends.data.concat(data);
      fetchAt.page = selectPage.value;
      fetchAt.maxPage = Math.ceil(all / 30);
      return;
    }
  });

  watch(debounceInput, async () => {
    selectPage.value = 0;
    const fetchFriends = await friendService.searchFriends(0, debounceInput.value);

    if (!fetchFriends) {
      return;
    }

    const {
      data,
      paginationData: { all },
    } = processFriendData(fetchFriends);
    friends.data = data;
    fetchAt.input = debounceInput.value;
    fetchAt.page = 0;
    fetchAt.maxPage = Math.ceil(all / 30);
  });

  watch(input, async () => {
    debounceFn(input.value);
  });

  onUnmounted(() => {
    debounceFn.cancel;
  });

  return [friends, input, fetchAt] as const;
};

export default useSearchFriends;
