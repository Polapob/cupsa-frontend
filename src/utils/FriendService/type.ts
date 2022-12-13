import { AxiosResponse } from "axios";

export type FriendResultTypes = {
  [key: string]: {
    student_id: string;
    full_name: string;
    generation_id: string;
    member_status: boolean;
  };
};
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

export interface ViewFriendResponse {
  student_id: string;
  tu_id: string;
  is_member: string;
  first_name: string;
  last_name: string;
  first_name_eng: string;
  last_name_eng: string;
  sex: string;
  prefix: string;
  generation_id: string;
}

export interface IViewFriendInterface {
  success: boolean;
  result: ViewFriendResponse;
}

export type SearchFriendsResponse = AxiosResponse<ISearchFriendsInterface, any>;
