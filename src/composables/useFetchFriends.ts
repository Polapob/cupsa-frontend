import { onMounted, onUpdated, reactive, ref } from "vue";
import friendService from "../services/FriendService";
import processFriendData from "../utils/FriendService/processFriendData";
import { useQuery } from "vue-query";

const useFetchFriends = () => {
  const friends = reactive({ data: [] as { id: string; fullName: string }[] });
  const numberOfFriend = ref(0);
  onMounted(async () => {
    const fetchFriends = await friendService.getFriends();
    if (fetchFriends?.data) {
      const arrayOfFriendData = processFriendData(fetchFriends.data.result).slice(0, 160);
      friends.data = arrayOfFriendData;
    }
  });
  onUpdated(async () => {
    numberOfFriend.value = friends.data.length;
  });

  return [friends, numberOfFriend] as const;
};

export default useFetchFriends;
