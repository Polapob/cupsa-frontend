import { types } from "mobx-state-tree";
import { FriendDataTypes } from "../../utils/Composables/useSearchFriends/type";
import { LoadingStatus } from "../user/type";

const SearchFriendsModel = types.model({
  id: types.string,
  fullName: types.string,
});

const Friends = types
  .model("Friends", {
    friends: types.optional(types.array(SearchFriendsModel), [] as Array<FriendDataTypes>),
    loadingStatus: types.enumeration<LoadingStatus>(Object.values(LoadingStatus)),
    errorMessage: types.optional(types.string, ""),
  })
  .views((self) => {
    return {
      get getFriends() {
        return self.friends;
      },
    };
  });

export default Friends;
