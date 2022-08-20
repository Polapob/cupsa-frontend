import axios, { AxiosError } from "axios";
import { IAxiosError, IOtherError } from "./axiosError.type";

const axiosErrorHandler = <T>(callback: (err: IAxiosError<T> | IOtherError) => void) => {
  return (error: Error | AxiosError<T>) => {
    if (axios.isAxiosError(error)) {
      callback({
        error: error,
        type: "axios-error",
      });
    } else {
      callback({
        error: error,
        type: "other-error",
      });
    }
  };
};

export default axiosErrorHandler;
