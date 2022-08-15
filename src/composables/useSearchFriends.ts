import { onMounted, onUpdated, reactive, Ref, ref, watch } from "vue";
import friendService from "../services/FriendService";
import processFriendData from "../utils/FriendService/processFriendData";
import { useQuery } from "vue-query";
import { FriendDataTypes } from "../utils/Composables/useSearchFriends/type";

const useSearchFriends = (selectPage: Ref<number>) => {
  const friends = reactive({ data: [] as FriendDataTypes[] });
  const input = ref("");
  const fetchAt = reactive({ input: "", page: 0, maxPage: 0 });

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
    if (fetchAt.input === input.value && fetchAt.page !== selectPage.value) {
      const fetchFriends = await friendService.searchFriends(selectPage.value, input.value);
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

  watch(input, async () => {
    selectPage.value = 0;
    const fetchFriends = await friendService.searchFriends(0, input.value);

    if (!fetchFriends) {
      return;
    }

    const {
      data,
      paginationData: { all },
    } = processFriendData(fetchFriends);
    friends.data = data;
    fetchAt.input = input.value;
    fetchAt.page = 0;
    fetchAt.maxPage = Math.ceil(all / 30);
  });

  return [friends, input, fetchAt] as const;
};

export default useSearchFriends;
