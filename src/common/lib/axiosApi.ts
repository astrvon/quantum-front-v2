/* eslint-disable @typescript-eslint/no-explicit-any */
import axios_, { AxiosResponse } from "axios";

import config from "@/common/config/configEnv";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";
import { StorageName } from "@/contexts/storageName";

export const axios = axios_.create({
  baseURL: config.baseEndpoint + "/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach Bearer token before each request
axios.interceptors.request.use(
  async (conf) => {
    const token = JSON.parse(
      localStorage.getItem(StorageName.authStorage.toString()) || "{}"
    )?.state?.token;

    if (token) {
      conf.headers[config.headerToken] = token;
    }

    return conf;
  },
  (error) => Promise.reject(error)
);

const parseResponse = (res: AxiosResponse<any, any>) => {
  // take out data nested that being wrapped at be
  if (!res?.data?.data) return res;

  const data = { ...res.data };
  delete res.data;
  return Object.assign(data, res);
};

export const axiosApi = {
  [IHTTPMethod.GET]: (url: string, params?: any) =>
    axios.get(url, { params }).then((res) => parseResponse(res)),
  [IHTTPMethod.POST]: (url: string, data?: any) =>
    axios.post(url, data).then((res) => parseResponse(res)),
  [IHTTPMethod.PUT]: (url: string, data?: any) =>
    axios.put(url, data).then((res) => parseResponse(res)),
  [IHTTPMethod.PATCH]: (url: string, data?: any) =>
    axios.patch(url, data).then((res) => parseResponse(res)),
  [IHTTPMethod.DELETE]: (url: string, data?: any) =>
    axios.delete(url, { params: data }).then((res) => parseResponse(res)),
};
