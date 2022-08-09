import base64EncodedBody from "../utils/AuthService/base64EncodedBody";
import { ILoginResponse } from "../utils/AuthService/type";
import apiClient from "../utils/axios/axios";
import { IErrorBase } from "../utils/axios/axiosError.type";
import axiosErrorHandler from "../utils/axios/errorHandler";
import qs from "qs";
import localStorageService, { LocalstorageService } from "./LocalstorageService";

type ILoginBodyTypes = Record<"email" | "password", string>;

class AuthService {
  private readonly callback: <T>(error: IErrorBase<T>) => void;
  private readonly localStorageService: LocalstorageService;
  constructor(callback: <T>(error: IErrorBase<T>) => void, localStorageService: LocalstorageService) {
    this.callback = callback;
    this.localStorageService = localStorageService;
  }

  async login(body: ILoginBodyTypes) {
    try {
      const { email, password } = body;
      const res = await apiClient.post<ILoginResponse>(
        "/lineApi/login",
        qs.stringify({
          auth: base64EncodedBody(email, password),
        }),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            accept: "*/*",
          },
        }
      );
      return res;
    } catch (err) {
      console.log(err);
      axiosErrorHandler(this.callback);
    }
  }

  validateAuthToken() {
    const token = this.localStorageService.get("authToken");
    return !!token;
  }
}

export const sampleCallback = <T>(error: IErrorBase<T>) => {
  console.log(error);
};

const authService = new AuthService(sampleCallback, localStorageService);
export default authService;
