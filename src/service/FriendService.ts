import apiClient from "../utils/axios/axios";
import { IErrorBase } from "../utils/axios/axiosError.type";
import axiosErrorHandler from "../utils/axios/errorHandler";
import { sampleCallback } from "./AuthService";

class FriendService {
  callback: <T>(error: IErrorBase<T>) => void;
  constructor(callback: <T>(error: IErrorBase<T>) => void) {
    this.callback = callback;
  }
  async findFriend() {
    try {
      const response = await apiClient.get("/lineApi/friends");
      return response;
    } catch (err) {
      axiosErrorHandler(this.callback);
    }
  }
}

const friendService = new FriendService(sampleCallback);
export default friendService;
