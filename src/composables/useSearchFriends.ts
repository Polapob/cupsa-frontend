import { onMounted, onUpdated, reactive, Ref, ref, watch } from "vue";
import friendService from "../services/FriendService";
import processFriendData from "../utils/FriendService/processFriendData";
import { useQuery } from "vue-query";

const useSearchFriends = (selectPage: Ref<number>) => {
  const friends = reactive({ data: [] as { id: string; fullName: string }[] });
  const input = ref("");
  const fetchAt = ref({ input: "", page: 0 });
  const numberOfFriend = ref(0);

  onMounted(async () => {
    const fetchFriends = await friendService.getFriends(0);
    if (fetchFriends?.data) {
      const arrayOfFriendData = processFriendData(fetchFriends.data.result);
      fetchAt.value.page = 0;
      friends.data = arrayOfFriendData;
      numberOfFriend.value = friends.data.length;
    }
  });

  onUpdated(async () => {
    if (fetchAt.value.page !== selectPage.value && fetchAt.value.input === input.value) {
      const fetchFriends = await friendService.getFriends(selectPage.value, input.value);
      if (fetchFriends?.data) {
        const arrayOfFriendData = processFriendData(fetchFriends.data.result);
        friends.data = friends.data.concat(arrayOfFriendData);
        fetchAt.value.page = selectPage.value;
        numberOfFriend.value = friends.data.length;
      }
      return;
    }
    if (fetchAt.value.page !== selectPage.value && fetchAt.value.input !== input.value) {
      selectPage.value = 0;
      const fetchFriends = await friendService.getFriends(0, input.value);
      if (fetchFriends?.data) {
        const arrayOfFriendData = processFriendData(fetchFriends.data.result);
        friends.data = arrayOfFriendData;
        fetchAt.value.page = 0;
        fetchAt.value.input = input.value;
        numberOfFriend.value = friends.data.length;
      }
    }
    return;
  });

  watch(input, async () => {
    selectPage.value = 0;
  });

  return [friends, numberOfFriend, input] as const;
};

export default useSearchFriends;
