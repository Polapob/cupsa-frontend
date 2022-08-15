import { AxiosResponse } from "axios";
import { FriendDataTypes } from "../Composables/useSearchFriends/type";
import { IGetFriendsInterface } from "./type";

const processFriendData = (responseData: AxiosResponse<IGetFriendsInterface, any>) => {
  const {
    result: { data: friends, struct: paginationData },
  } = responseData.data;

  const data = Object.entries(friends).reduce((prevValue, currentValue) => {
    return [...prevValue, { id: currentValue[0], fullName: currentValue[1] }];
  }, [] as FriendDataTypes[]);

  return { data, paginationData };
};

export default processFriendData;
