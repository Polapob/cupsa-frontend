import { onMounted, onUpdated, reactive, Ref, ref } from "vue";
import friendService from "../services/FriendService";
import processFriendData from "../utils/FriendService/processFriendData";
import { useQuery } from "vue-query";

const useFetchFriends = (selectPage: Ref<number>) => {
  const friends = reactive({ data: [] as { id: string; fullName: string }[] });
  const fetchAt = ref(0);
  const numberOfFriend = ref(0);

  onMounted(async () => {
    const fetchFriends = await friendService.getFriends(0);
    if (fetchFriends?.data) {
      const arrayOfFriendData = processFriendData(fetchFriends.data.result);
      fetchAt.value = 0;
      friends.data = arrayOfFriendData;
      numberOfFriend.value = friends.data.length;
    }
  });

  onUpdated(async () => {
    if (fetchAt.value !== selectPage.value) {
      const fetchFriends = await friendService.getFriends(selectPage.value);
      if (fetchFriends?.data) {
        const arrayOfFriendData = processFriendData(fetchFriends.data.result);
        fetchAt.value = selectPage.value;
        friends.data = arrayOfFriendData;
        numberOfFriend.value = friends.data.length;
      }
    }
  });

  return [friends, numberOfFriend] as const;
};

export default useFetchFriends;
