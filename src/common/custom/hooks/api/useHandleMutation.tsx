"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

/* BECAREFUL changes on this could lead to major BREAKING CHANGES */

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { App as AntdApp } from "antd";

import config from "@/common/config/configEnv";
import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";
import { axiosApi } from "@/common/lib/axiosApi";
import { handleRefetch } from "@/common/lib/queryClient";
import { useAuthStore } from "@/contexts/store/authStore";

const isClient = typeof window !== "undefined";

export type IHandleMutationProps<T> = {
  url: string;
  method: IHTTPMethod;
  onSuccessMessage?: string;
  onErrorMessage?: string;
} & IBaseMutationProps<T> &
  Partial<UseMutationOptions<T, Error, any, unknown>>;

const useHandleMutation = <T, C>({
  url,
  method,
  onSuccessMessage,
  onSuccessCallback,
  onErrorMessage,
  refetchKey,
  endpointVersion = config.baseEndpointVersion,
  ...rest
}: IHandleMutationProps<T>) => {
  const { logout } = useAuthStore();
  const { message } = AntdApp.useApp();

  return useMutation({
    mutationFn: async (data?: C) =>
      axiosApi[method](`v${endpointVersion}/${url}`, data as any) as any,
    onSuccess: async (data: T) => {
      if (refetchKey !== undefined) await handleRefetch(refetchKey);

      onSuccessCallback?.(data);
      if (onSuccessMessage && isClient) message.success(onSuccessMessage);
    },

    onError: (error) => {
      // @ts-expect-error rtk not really mapping axios err
      if (error?.status === 401) {
        message.error("Login expired");
        logout();
      }
      if (onErrorMessage) {
        message.error(onErrorMessage);
      }
      if (!onErrorMessage) {
        console.log({ error });
        message.error(
          (error as any)?.response?.data?.message ?? "Action failed"
        );
      }
    },
    ...rest,
  });
};

export default useHandleMutation;
