import { ICustomer } from "@/common/interfaces/data/customer";
import { IPagination } from "@/common/interfaces/pagination";

import { IEndpointCustomers } from "../../endpoints/customers.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUseGetListCustomersFetchParams {
  pagination: IPagination;
  filters?: { name?: string };
}

export interface IUseGetListCustomersFetchProps {
  params: IUseGetListCustomersFetchParams;
  enabled?: boolean;
}

const useGetListCustomersFetch = ({
  params,
  enabled = true,
}: IUseGetListCustomersFetchProps) => {
  return useHandleFetcher<ICustomer[]>({
    key: IFetcherKey.CUSTOMER,
    url: IEndpointCustomers.LIST,
    params,
    enabled,
  });
};

export default useGetListCustomersFetch;
