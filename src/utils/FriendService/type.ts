import { AxiosResponse } from "axios";

export type FriendResultTypes = Record<string, string>;
export type PaginationMetadataTypes = {
  from: number;
  to: number;
  all: number;
};

export interface ISearchFriendsInterface {
  success: boolean;
  result: {
    data: FriendResultTypes;
    struct: PaginationMetadataTypes;
  };
}

export type SearchFriendsResponse = AxiosResponse<ISearchFriendsInterface, any>;
