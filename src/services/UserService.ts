import apiClient from "../utils/axios/axios";
import { IErrorBase } from "../utils/axios/axiosError.type";
import axiosErrorHandler from "../utils/axios/errorHandler";
import { UpdateUserBodyTypes } from "../utils/UserService/type";
import { sampleCallback } from "./AuthService";

class UserService {
  private readonly callback: <T>(error: IErrorBase<T>) => void;
  constructor(callback: <T>(error: IErrorBase<T>) => void) {
    this.callback = callback;
  }

  async getUserProfile() {
    try {
      const response = await apiClient.get("/lineApi/self");
      return response;
    } catch (err) {
      axiosErrorHandler(this.callback);
    }
  }

  async updateUserProfile(body: UpdateUserBodyTypes) {
    try {
      const response = await apiClient.post("/lineApi/self", body, {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });
      return response;
    } catch (err) {
      console.log(err);
      axiosErrorHandler(this.callback);
    }
  }
}

const userService = new UserService(sampleCallback);
export default userService;
