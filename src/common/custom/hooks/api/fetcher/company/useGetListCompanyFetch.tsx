import { ICompany } from "@/common/interfaces/data/company";
import { IPagination } from "@/common/interfaces/pagination";

import { IEndpointCompany } from "../../endpoints/company.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUseGetListCompanyParams {
  pagination: IPagination;
  filters?: { companyName?: string };
}

export interface IUseGetListCompanyProps {
  params: IUseGetListCompanyParams;
  enabled?: boolean;
}

const useGetListCompanyFetch = ({
  params,
  enabled = false,
}: IUseGetListCompanyProps) => {
  const fetch = useHandleFetcher<ICompany[]>({
    key: IFetcherKey.COMPANY,
    url: IEndpointCompany.LIST,
    params,
    enabled,
  });

  return fetch;
};

export default useGetListCompanyFetch;
