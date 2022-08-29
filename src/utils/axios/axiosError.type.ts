import axios, { AxiosError } from "axios";

export enum ErrorTypes {
  AXIOS_ERROR = "AXIOS_ERROR",
  OTHER_ERROR = "OTHER_ERROR",
}

export interface IErrorBase<T = undefined> {
  error: Error | AxiosError<T>;
  type: "axios-error" | "other-error";
}

export interface IAxiosError<T> extends IErrorBase<T> {
  error: AxiosError<T>;
  type: "axios-error";
}
export interface IOtherError extends IErrorBase {
  error: Error;
  type: "other-error";
}

export interface IErrorResponse {
  message: string;
  success: boolean;
}
