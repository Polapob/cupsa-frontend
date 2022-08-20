import { flow, types } from "mobx-state-tree";
import { LoadingStatus } from "../user/type";
import friendService from "../../services/FriendService";
import { FriendDataTypes } from "../../utils/Composables/useSearchFriends/type";
import { AxiosResponse } from "axios";
import { ISearchFriendsInterface } from "../../utils/FriendService/type";
import processFriendData from "../../utils/FriendService/processFriendData";
import { cast } from "mobx-state-tree";
import { observable } from "mobx";

const SearchFriendsModel = types.model({
  id: types.string,
  fullName: types.string,
});

const Friends = types
  .model("Friends", {
    friends: types.optional(types.array(SearchFriendsModel), [] as FriendDataTypes[]),
    loadingStatus: types.enumeration<LoadingStatus>(Object.values(LoadingStatus)),
    errorMessage: types.optional(types.string, ""),
  })
  .views((self) => {
    return {
      get getFriends() {
        return self.friends;
      },
    };
  })
  .actions((self) => {
    const searchFriends = flow(function* (page: number, keyword = "") {
      const response = (yield friendService.searchFriends(page, keyword)) as AxiosResponse<ISearchFriendsInterface, any> | undefined;
      if (!response) {
        return undefined;
      }
      const { data, paginationData } = processFriendData(response);
      //const searchFriendResult =
      self.friends = cast(data);
      console.log(self.friends.length);
      return { data, paginationData };
    });
    return { searchFriends };
  });

const friendStore = Friends.create({
  loadingStatus: LoadingStatus.IDLE,
});

export default friendStore;
