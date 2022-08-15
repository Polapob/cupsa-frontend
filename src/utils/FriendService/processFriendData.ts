import { FriendDataTypes } from "../Composables/useSearchFriends/type";
import { SearchFriendsResponse } from "./type";

const processFriendData = (responseData: SearchFriendsResponse) => {
  const {
    result: { data: friends, struct: paginationData },
  } = responseData.data;

  const data = Object.entries(friends).reduce((prevValue, currentValue) => {
    return [...prevValue, { id: currentValue[0], fullName: currentValue[1] }];
  }, [] as FriendDataTypes[]);

  return { data, paginationData };
};

export default processFriendData;
