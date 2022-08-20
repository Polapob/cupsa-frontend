import { IErrorBase } from "../utils/axios/axiosError.type";

export const sampleCallback = <T>(error: IErrorBase<T>) => {
  console.log(error);
};
