import { FriendResultTypes } from "./type";

const processFriendData = (friends: FriendResultTypes) => {
  return Object.entries(friends).reduce((prevValue, currentValue) => {
    return [...prevValue, { id: currentValue[0], fullName: currentValue[1] }];
  }, [] as { id: string; fullName: string }[]);
};

export default processFriendData;
