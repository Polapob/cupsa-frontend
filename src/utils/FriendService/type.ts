import { AxiosResponse } from "axios";

export type FriendResultTypes = Record<string, string>;

export interface ISearchFriendsInterface {
  success: boolean;
  result: {
    data: FriendResultTypes;
    struct: {
      from: number;
      to: number;
      all: number;
    };
  };
}

export type SearchFriendsResponse = AxiosResponse<ISearchFriendsInterface, any>;
