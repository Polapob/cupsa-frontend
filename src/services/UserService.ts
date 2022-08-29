import apiClient from "../utils/axios/axios";
import { IErrorBase } from "../utils/axios/axiosError.type";
import axiosErrorHandler from "../utils/axios/errorHandler";
import { GetUserProfileResponse, UpdateUserBodyTypes } from "../utils/UserService/type";
import { sampleCallback } from "./utils";

class UserService {
  private readonly callback: <T>(error: IErrorBase<T>) => void;
  constructor(callback: <T>(error: IErrorBase<T>) => void) {
    this.callback = callback;
  }

  async getUserProfile() {
    try {
      const response = await apiClient.get<GetUserProfileResponse>("/lineApi/self");
      return response;
    } catch (err) {
      axiosErrorHandler(this.callback);
    }
  }

  async checkMember() {
    try {
      const userProfile = await this.getUserProfile();
      if (userProfile?.data) {
        const { is_member: isMember } = userProfile.data.result;
        return { isMember: Boolean(parseInt(isMember)) };
      }
      throw new Error("Unauthorized", {
        cause: {
          name: "unauthorized",
          message: "auth_token mismatch",
          stack: "unauthorized",
        },
      });
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
