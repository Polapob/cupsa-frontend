import base64EncodedBody from "../utils/AuthService/base64EncodedBody";
import { ILoginResponse } from "../utils/AuthService/type";
import apiClient from "../utils/axios/axios";
import { IErrorBase } from "../utils/axios/axiosError.type";
import axiosErrorHandler from "../utils/axios/errorHandler";
import qs from "qs";

type ILoginBodyTypes = Record<"email" | "password", string>;

class AuthService {
  private readonly callback: <T>(error: IErrorBase<T>) => void;
  constructor(callback: <T>(error: IErrorBase<T>) => void) {
    this.callback = callback;
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
}

export const sampleCallback = <T>(error: IErrorBase<T>) => {
  console.log(error);
};

const authService = new AuthService(sampleCallback);
export default authService;
