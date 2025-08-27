import { IScopeResponse } from "@/common/interfaces/data/scope";
import { IPagination } from "@/common/interfaces/pagination";

import { IEndpointScopes } from "../../endpoints/scope.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

export interface IUseGetListRolesScopesProps {
  params: IPagination;
  enabled?: boolean;
}

const useGetListScopesFetch = ({
  params,
  enabled = true,
}: IUseGetListRolesScopesProps) => {
  const fetch = useHandleFetcher<IScopeResponse[]>({
    key: IFetcherKey.SCOPE,
    url: IEndpointScopes.LIST,
    params,
    enabled,
  });

  return fetch;
};

export default useGetListScopesFetch;
