import base64EncodedBody from "../utils/AuthService/base64EncodedBody";
import { ILoginResponse } from "../utils/AuthService/type";
import apiClient from "../utils/axios/axios";
import { IErrorBase } from "../utils/axios/axiosError.type";
import axiosErrorHandler from "../utils/axios/errorHandler";

type ILoginBodyTypes = Record<"email" | "password", string>;

class AuthService {
  callback: <T>(error: IErrorBase<T>) => void;
  constructor(callback: <T>(error: IErrorBase<T>) => void) {
    this.callback = callback;
  }

  async login(body: ILoginBodyTypes) {
    try {
      const { email, password } = body;
      const res = await apiClient.post<ILoginResponse>(
        "/lineApi/login",
        {
          auth: base64EncodedBody(email, password),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
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
