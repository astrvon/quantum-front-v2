import { IRoleResponse } from "@/common/interfaces/data/role";
import { IPagination } from "@/common/interfaces/pagination";

import { IEndpointRoles } from "../../endpoints/role.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUserGetListRolesFetchParams {
  pagination: IPagination;
  filters?: {
    userIds?: string[];
  };
}

export interface IUseGetListRolesFetchProps {
  params: IUserGetListRolesFetchParams;
  enabled?: boolean;
}

const useGetListRolesFetch = ({
  params,
  enabled = true,
}: IUseGetListRolesFetchProps) => {
  const fetch = useHandleFetcher<IRoleResponse[]>({
    key: IFetcherKey.ROLE,
    url: IEndpointRoles.LIST,
    params,
    enabled,
  });

  return fetch;
};

export default useGetListRolesFetch;
