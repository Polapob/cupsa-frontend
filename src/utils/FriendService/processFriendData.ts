import { FriendDataTypes } from "../Composables/useSearchFriends/type";
import { SearchFriendsResponse } from "./type";

const processFriendData = (responseData: SearchFriendsResponse) => {
  const {
    result: { data: friends, struct: paginationData },
  } = responseData.data;

  const data = Object.entries(friends).reduce((prevValue, [id, friendData]) => {
    return [...prevValue, { id: id, fullName: friendData.full_name, generationId: friendData.generation_id, memberStatus: friendData.member_status }];
  }, [] as Array<FriendDataTypes>);

  return { data, paginationData };
};

export default processFriendData;
