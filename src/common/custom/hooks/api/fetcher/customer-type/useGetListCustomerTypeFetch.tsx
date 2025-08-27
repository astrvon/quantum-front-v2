import { ICustomerType } from "@/common/interfaces/data/customerType";
import { IPagination } from "@/common/interfaces/pagination";

import { IEndpointCustomerType } from "../../endpoints/customer-type.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUseGetListCustomerTypeParams {
  pagination: IPagination;
  filters?: { name?: string; isActive?: boolean };
}

export interface IUseGetListCustomerTypeProps {
  params: IUseGetListCustomerTypeParams;
  enabled?: boolean;
}

const useGetListCustomerTypeFetch = ({
  params,
  enabled = false,
}: IUseGetListCustomerTypeProps) => {
  return useHandleFetcher<ICustomerType[]>({
    key: IFetcherKey.CUSTOMER_TYPE,
    url: IEndpointCustomerType.LIST,
    params,
    enabled,
  });
};

export default useGetListCustomerTypeFetch;
