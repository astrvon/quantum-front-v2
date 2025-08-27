import { IUser } from "@/common/interfaces/data/user";
import { IPagination } from "@/common/interfaces/pagination";

import { IEndpointUsers } from "../../endpoints/users.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUseGetListUsersParams {
  pagination: IPagination;
  filters?: {
    customerId?: string;
    isCompany?: boolean;
    isActive?: boolean;
    hasCustomer?: boolean;
  };
}

export interface IUseGetListUsersFetchProps {
  params: IUseGetListUsersParams;
  enabled?: boolean;
}

const useGetListUsersFetch = ({
  params,
  enabled = true,
}: IUseGetListUsersFetchProps) =>
  useHandleFetcher<Omit<IUser, "uid">[]>({
    key: IFetcherKey.USER,
    url: IEndpointUsers.LIST,
    params,
    enabled,
  });

export default useGetListUsersFetch;
