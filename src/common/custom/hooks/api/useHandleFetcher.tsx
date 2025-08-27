"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { message } from "antd";

import config from "@/common/config/configEnv";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { axiosApi } from "@/common/lib/axiosApi";
import { useAuthStore } from "@/contexts/store/authStore";

import fetcherKey from "./fetcher/fetchKey";

export type IHandleFetcherProps<T> = {
  key: fetcherKey;
  url: string;
  endpointVersion?: number;
  params?: any;
  onErrorMessage?: string;
} & Partial<UndefinedInitialDataOptions<T, Error, T, fetcherKey[]>>;

const useHandleFetcher = <T,>({
  key,
  url,
  params,
  enabled = true,
  endpointVersion = config.baseEndpointVersion,
  onErrorMessage,
  ...rest
}: IHandleFetcherProps<T>) => {
  const { logout } = useAuthStore();
  return useQuery({
    queryFn: () => axiosApi.GET(`v${endpointVersion}/${url}`, params),
    enabled,
    refetchOnReconnect: true,
    throwOnError: false,
    retry: (failureCount, error) => {
      // @ts-expect-error rtk not really mapping axios err
      if (error?.status === 401) {
        message.error("Login expired");
        logout();
        return false;
      }

      if (onErrorMessage) message.error(onErrorMessage);
      if (failureCount < 3)
        message.error((error as any)?.data?.message ?? "Action Failed");

      return failureCount < 3;
    },
    ...rest,
    select: (response: any) => {
      return response as IBaseResponse<T>;
    },
    queryKey: [key, JSON.stringify(params) as any],
  });
};

export default useHandleFetcher;
