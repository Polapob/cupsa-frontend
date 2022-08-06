import axios, { AxiosError } from "axios";

export enum ErrorTypes {
  AXIOS_ERROR = "AXIOS_ERROR",
  OTHER_ERROR = "OTHER_ERROR",
}

export interface IErrorBase<T> {
  error: Error | AxiosError<T>;
  type: "axios-error" | "other-error";
}

export interface IAxiosError<T> extends IErrorBase<T> {
  error: AxiosError<T>;
  type: "axios-error";
}
export interface IOtherError<T> extends IErrorBase<T> {
  error: Error;
  type: "other-error";
}
