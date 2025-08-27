import { IUser } from "@/common/interfaces/data/user";
import { IPagination } from "@/common/interfaces/pagination";

import { IEndpointUsers } from "../../endpoints/users.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUseGetListUsersByCompanyIdParams {
  pagination: IPagination;
  filters?: {
    companyId?: string;
  };
}

export interface IUseGetListUsersByCompanyIdFetchProps {
  params: IUseGetListUsersByCompanyIdParams;
  enabled?: boolean;
}

const useGetListUsersByCompanyIdFetch = ({
  params,
  enabled = true,
}: IUseGetListUsersByCompanyIdFetchProps) =>
  useHandleFetcher<Omit<IUser, "uid">[]>({
    key: IFetcherKey.USER,
    url: IEndpointUsers.LIST_USER_BY_COMPANY_ID,
    params,
    enabled,
  });

export default useGetListUsersByCompanyIdFetch;
