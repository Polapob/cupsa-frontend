import { onMounted, reactive } from "vue";
import friendService from "../services/FriendService";
import processFriendData from "../utils/FriendService/processFriendData";

const useFetchFriends = () => {
  const friends = reactive({ data: [] as { id: string; fullName: string }[] });
  onMounted(async () => {
    const fetchFriends = await friendService.getFriends();
    if (fetchFriends?.data) {
      const arrayOfFriendData = processFriendData(fetchFriends.data.result).slice(0, 30);
      friends.data = arrayOfFriendData;
    }
  });
  return [friends] as const;
};

export default useFetchFriends;
