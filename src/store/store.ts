import { types } from "mobx-state-tree";
import Friends from "./friends/model";
import { User } from "./user/model";
import { LoadingStatus } from "./user/type";

const RootStore = types.model({
  user: types.optional(User, {
    loadingStatus: LoadingStatus.IDLE,
    errorMessage: "",
  }),
  friends: types.optional(Friends, {
    loadingStatus: LoadingStatus.IDLE,
    errorMessage: "",
  }),
});

const store = RootStore.create({});

export default store;
