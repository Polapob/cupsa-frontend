import apiClient from "../utils/axios/axios";
import { IErrorBase } from "../utils/axios/axiosError.type";
import axiosErrorHandler from "../utils/axios/errorHandler";
import { ISearchFriendsInterface, IViewFriendInterface } from "../utils/FriendService/type";
import { sampleCallback } from "./utils";

class FriendService {
  private readonly callback: <T>(error: IErrorBase<T>) => void;
  constructor(callback: <T>(error: IErrorBase<T>) => void) {
    this.callback = callback;
  }
  async searchFriends(page: number, keyword = "", includeAll = false) {
    try {
      if (includeAll) {
        return await apiClient.get<ISearchFriendsInterface>("/lineApi/search", {
          params: {
            limit: 30,
            offset: page * 30,
            keyword,
          },
        });
      }
      return await apiClient.get<ISearchFriendsInterface>("/lineApi/friends", {
        params: {
          limit: 30,
          offset: page * 30,
          keyword,
        },
      });
    } catch (err) {
      console.log(err);
      axiosErrorHandler(this.callback);
    }
  }

  async viewFriend(studentId: string) {
    try {
      const response = await apiClient.get<IViewFriendInterface>(`/lineApi/friend/${studentId}`);
      return response;
    } catch (err) {
      console.log(err);
      axiosErrorHandler(this.callback);
    }
  }
}

const friendService = new FriendService(sampleCallback);
export default friendService;
