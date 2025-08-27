import { AxiosResponse } from "axios";

import { IMeta } from "./metaResponse";

export interface IBaseResponse<T> extends AxiosResponse<T, T> {
  meta?: IMeta;
  data: T;
  statusCode: number;
}
