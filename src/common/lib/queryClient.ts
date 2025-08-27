/* eslint-disable @typescript-eslint/no-explicit-any */

import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { isArray, isEmpty, map } from "lodash";

import IFetcherKey from "../custom/hooks/api/fetcher/fetchKey";
import { IBaseMutationProps } from "../interfaces/baseMutationProps";

export const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 1,
      networkMode: "online",
      gcTime: 5 * 60 * 1000, // 5minutes
      enabled: true,
    },
    mutations: {
      retry: 0,
      gcTime: 5 * 60 * 1000, // 5minutes
    },
  },
});

export const handleRefetch = async (
  refetchKey: IBaseMutationProps<any>["refetchKey"]
) => {
  if (typeof refetchKey === "number" && refetchKey in IFetcherKey)
    return queryClient.invalidateQueries({
      queryKey: [refetchKey],
      refetchType: "all",
      type: "all",
    });

  if (!isEmpty(refetchKey) && isArray(refetchKey))
    return Promise.all(
      map(refetchKey, (key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      )
    );
};
