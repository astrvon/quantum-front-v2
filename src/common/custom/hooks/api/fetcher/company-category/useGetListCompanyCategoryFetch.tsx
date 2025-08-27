import { ICompanyCategory } from "@/common/interfaces/data/company-category";
import { IPagination } from "@/common/interfaces/pagination";

import { IEndpointCompanyCategory } from "../../endpoints/company-category.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUseGetListCompanyCategoryParams {
  pagination: IPagination;
  filters?: { companyCategory?: string; isActive?: boolean };
}

export interface IUseGetListCompanyCategoryProps {
  params: IUseGetListCompanyCategoryParams;
  enabled?: boolean;
}

const useGetListCompanyCategoryFetch = ({
  params,
  enabled = false,
}: IUseGetListCompanyCategoryProps) => {
  const fetch = useHandleFetcher<ICompanyCategory[]>({
    key: IFetcherKey.COMPANY_CATEGORY,
    url: IEndpointCompanyCategory.LIST,
    params,
    enabled,
  });

  return fetch;
};

export default useGetListCompanyCategoryFetch;
