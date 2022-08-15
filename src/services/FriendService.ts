import apiClient from "../utils/axios/axios";
import { IErrorBase } from "../utils/axios/axiosError.type";
import axiosErrorHandler from "../utils/axios/errorHandler";
import { ISearchFriendsInterface } from "../utils/FriendService/type";
import { sampleCallback } from "./AuthService";

class FriendService {
  private readonly callback: <T>(error: IErrorBase<T>) => void;
  constructor(callback: <T>(error: IErrorBase<T>) => void) {
    this.callback = callback;
  }
  async searchFriends(page: number, keyword = "") {
    try {
      const response = await apiClient.get<ISearchFriendsInterface>("/lineApi/friends", {
        params: {
          limit: 30,
          offset: page * 30,
          keyword,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
      axiosErrorHandler(this.callback);
    }
  }
}

const friendService = new FriendService(sampleCallback);
export default friendService;
