import { ICustomer } from "@/common/interfaces/data/customer";
import { IPagination } from "@/common/interfaces/pagination";

import { IEndpointCustomer } from "../../endpoints/customer.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUseGetListCustomerParams {
  pagination: IPagination;
  filters?: { isActive?: boolean };
}

export interface IUseGetListCustomerProps {
  params: IUseGetListCustomerParams;
  enabled?: boolean;
}

const useGetListCustomerFetch = ({
  params,
  enabled = false,
}: IUseGetListCustomerProps) => {
  const fetch = useHandleFetcher<ICustomer[]>({
    key: IFetcherKey.CUSTOMER,
    url: IEndpointCustomer.LIST,
    params,
    enabled,
  });

  return fetch;
};

export default useGetListCustomerFetch;
